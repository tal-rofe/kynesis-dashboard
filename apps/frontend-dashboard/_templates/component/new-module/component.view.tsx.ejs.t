---
to: src/app/<%= h.changeCase.paramCase(pageName.toLowerCase()) %>/components/<%= h.changeCase.pascalCase(moduleName.toLowerCase()) %>/<%= h.changeCase.pascalCase(moduleName.toLowerCase()) %>.view.tsx
---
<% name = moduleName.toLowerCase() %>import React from 'react';

type Props = object;

const <%= h.changeCase.pascalCase(name) %>View = (props: Props) => {
  return <div><%= h.changeCase.pascalCase(name) %>View</div>;
};

export default React.memo(<%= h.changeCase.pascalCase(name) %>View);
