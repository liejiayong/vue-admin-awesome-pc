module.exports = function (plop) {
  plop.setGenerator('newfile', {
    description: 'welcome to generator newfile.',

    // inquirer prompts
    prompts: [
      {
        type: 'input',
        name: 'kind',
        message: '请输入创建类型？(views/components)',
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入文件夹名称',
      },
      {
        type: 'input',
        name: 'scss',
        message: '需要scss文件吗？(y/n)',
      },
    ],

    // actions to perform
    actions: (data) => {
      const name = '{{name}}',
        kind = '{{kind}}';
      let actions = [];
      if (data.name) {
        actions.push({
          type: 'add',
          path: `src/${kind}/${name}/index.vue`, // 文件生成后所在的位置
          templateFile: 'src/temp/index.vue', // 模板路径
          data: {
            name: name,
          },
        });
      }
      if (data.scss === 'y') {
        actions.push({
          type: 'add',
          path: `src/${kind}/${name}/index.scss`, // 文件生成后所在的位置
          templateFile: 'src/temp/index.scss', // 模板路径
        });
      }
      return actions;
    },
  });
};
