const { notEmpty } = require("../utils.js");
let { templateFolder } = require("../../../src/config/config.js");
module.exports = {
  description: "创建view",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入view名称,勿与之前重复,然后点击回车",
      validate: notEmpty("name"),
    },
  ],
  actions: (data) => {
    const name = "{{name}}";
    const actions = [
      {
        type: "add",
        path: `src/views/${templateFolder || "project"}/${name}/index.vue`,
        templateFile: "src/temp/view/index.hbs",
        data: {
          name: name,
        },
      },
    ];

    return actions;
  },
};
