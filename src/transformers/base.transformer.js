const _ = require("lodash");

class TransformerAbstract {
  defaultIncludes = [];

  async transform(model, includes) {
    return await this._mapModelWithIncludes(
      model,
      includes?.length
        ? (this.defaultIncludes || []).concat(includes)
        : this.defaultIncludes
    );
  }

  async transformList(models, includes) {
    const transformedPromises = models.map((model) => {
      return this._mapModelWithIncludes(
        model,
        includes ? includes : this.defaultIncludes
      );
    });

    return await Promise.all(transformedPromises);
  }

  _map(model) {
    throw new Error("Method '_map()' must be implemented.");
  }

  async _mapModelWithIncludes(model, includes) {
    let mappedModel = this._map(model);

    if (includes) {
      const includePromises = includes.map((i) => this._addInclude(model, i));

      const responses = await Promise.all(includePromises);

      responses.forEach((res) => {
        mappedModel = {
          ...mappedModel,
          ...res,
        };
      });
    }

    return mappedModel;
  }

  async _addInclude(model, include) {
    const camelCaseName = _.camelCase(include);
    const methodName =
      "include" +
      camelCaseName.charAt(0).toUpperCase() +
      camelCaseName.slice(1);
    const result = await this[methodName](model);

    try {
      return {
        [include]: result,
      };
    } catch (e) {
      //   logger.crit(methodName + " not Found");
    }
  }
}

module.exports = TransformerAbstract;
