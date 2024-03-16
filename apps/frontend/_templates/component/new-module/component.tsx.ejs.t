---
to: src/app/<%= h.changeCase.paramCase(pageName.toLowerCase()) %>/components/<%= h.changeCase.pascalCase(moduleName.toLowerCase()) %>.tsx
---
<% name = moduleName.toLowerCase() %>import React from 'react';

type Props = object;

const <%= h.changeCase.pascalCase(name) %> = () => {
  return (
    <div>
      <span><%= h.changeCase.pascalCase(name) %> module</span>
    </div>
  );
};

export default React.memo(<%= h.changeCase.pascalCase(name)%>);
