const { notEmpty } = require("../utils.js");

module.exports = {
  description: "创建mock&api",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入mock名称,勿与之前重复,然后点击回车",
      validate: notEmpty("name"),
    },
  ],
  actions: (data) => {
    const name = "{{name}}";
    const actions = [
      {
        type: "add",
        path: `mock/controller/${name}.js`,
        templateFile: "src/temp/mock/index.hbs",
        data: {
          name: name,
        },
      },
      {
        type: "add",
        path: `src/api/${name}.js`,
        templateFile: "src/temp/api/index.hbs",
        data: {
          name: name,
        },
      },
    ];

    return actions;
  },
};
