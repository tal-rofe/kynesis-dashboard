---
to: src/components/layout/<%= h.changeCase.pascalCase(name.toLowerCase()) %>/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import classes from './<%= h.changeCase.pascalCase(name) %>.module.scss';

type Props = object;

const <%= h.changeCase.pascalCase(name) %> = () => {
  return (
    <div className={classes['container']}>
      <span><%= h.changeCase.pascalCase(name) %> Layout</span>
    </div>
  );
};

export default React.memo(<%= h.changeCase.pascalCase(name)%>);
