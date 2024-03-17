---
to: src/components/ui/UI<%= h.changeCase.pascalCase(name.toLowerCase()) %>.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

type Props = object;

export const UI<%= h.changeCase.pascalCase(name) %> = () => {
  return (
    <div>
      <span><%= h.changeCase.pascalCase(name) %> UI</span>
    </div>
  );
};