---
to: src/app/<%= h.changeCase.paramCase(pageName.toLowerCase()) %>/components/<%= h.changeCase.pascalCase(moduleName.toLowerCase()) %>/<%= h.changeCase.pascalCase(moduleName.toLowerCase()) %>.tsx
---
<% name = moduleName.toLowerCase() %>import React from 'react';

import <%= h.changeCase.pascalCase(name) %>View from './<%= h.changeCase.pascalCase(name) %>.view';

type Props = object;

const <%= h.changeCase.pascalCase(name) %> = (props: Props) => {
  return <<%= h.changeCase.pascalCase(name) %>View />;
};

export default React.memo(<%= h.changeCase.pascalCase(name) %>);
