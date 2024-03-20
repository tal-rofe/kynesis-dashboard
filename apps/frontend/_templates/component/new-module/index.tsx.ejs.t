---
to: src/app/<%= h.changeCase.paramCase(pageName.toLowerCase()) %>/components/<%= h.changeCase.pascalCase(moduleName.toLowerCase()) %>/index.ts
---
<% name = moduleName.toLowerCase() %>import <%= h.changeCase.pascalCase(name) %> from './<%= h.changeCase.pascalCase(name) %>';

export default <%= h.changeCase.pascalCase(name) %>;
