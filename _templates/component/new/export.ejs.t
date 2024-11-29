---
inject: true
to: lib/main.ts
after: dependencies
skip_if: <%=name%>
---

export { <%=name%> } from './components/<%=name%>'
