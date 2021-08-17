const { notEmpty } = require('../utils.js');
// let { templateFolder } = require("../../../src/config/config.js");
let templateFile = '';
module.exports = {
	description: '创建curd',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: '请输入view名称,勿与之前重复,然后点击回车',
			validate: notEmpty('name'),
		},
	],
	actions: (data) => {
		const name = '{{name}}';
		const properCaseName = '{{properCase name}}';
		const actions = [
			{
				type: 'add',
				path: `src/views/${templateFolder || 'project'}/${name}/index.vue`,
				templateFile: 'src/temp/curd/index.hbs',
				data: {
					name: name,
				},
			},
			{
				type: 'add',
				path: `src/views/${templateFolder || 'project'}/${name}/components/${properCaseName}Edit.vue`,
				templateFile: 'src/temp/curd/edit.hbs',
				data: {
					name: name,
				},
			},
			{
				type: 'add',
				path: `mock/controller/${name}.js`,
				templateFile: 'src/temp/mock/index.hbs',
				data: {
					name: name,
				},
			},
			{
				type: 'add',
				path: `src/api/${name}.js`,
				templateFile: 'src/temp/api/index.hbs',
				data: {
					name: name,
				},
			},
		];

		return actions;
	},
};
