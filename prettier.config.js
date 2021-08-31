const INLINE_ELEMENTS = ['span'];
module.exports = {
  printWidth: 120,
  tabWidth: 2 /* Specify the number of spaces per indentation-level. */,
  useTabs: false /* Indent lines with tabs instead of spaces. */,
  // Print semicolons at the ends of statements.
  semi: true,
  singleQuote: true,
  // such as, as-needed: {true: 0,0: 0,'qux-lorem': true};"consistent": 强制执行一致的引用风格需要引用对象字面值属性名称;preserve:保留用户输入
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  // es5: Trailing commas where valid in ES5 (objects, arrays, etc.)
  trailingComma: 'es5',
  // Print spaces between brackets in object literals. true Example: { foo: bar }.
  bracketSpacing: true,
  // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
  jsxBracketSameLine: false,
  // "always" - Always include parens. Example: (x) => x
  // "avoid" - Omit parens when possible. Example: x => x
  arrowParens: 'always',
  /* Range start */
  rangeStart: 0,
  rangeEnd: Infinity,
  /* Range end */
  // parser:'babylon', /* 默认不打开 */
  /* 
  Specify which parser to use.
	parser: 'None'|'babel',
	Specify the file name to use to infer which parser to use.
	filepath: 'None'|<string>,
	指定某片段格式化。Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
  */
  requirePragma: false,
  // 指定某个文件已被格式化，配合requirePragma使用。Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
  insertPragma: false,
  // 	"always" - Wrap prose if it exceeds the print width.
  // "never" - Do not wrap prose.
  // "preserve" - Wrap prose as-is. First available in v1.9.0
  proseWrap: 'preserve',
  // "css" - Respect the default value of CSS display property.
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  // Format embedded code if Prettier can automatically identify it.
  embeddedLanguageFormatting: 'auto',
  // for IDE attriubte start
  wrap_attributes: 'force-aligned',
  end_with_newline: true,
  'vue/multiline-html-element-content-newline': [
    'error',
    {
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea', ...INLINE_ELEMENTS],
      allowEmptyLines: false,
    },
  ],
};
