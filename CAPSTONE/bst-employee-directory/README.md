# Corporate Employee Directory (Binary Search Tree)
CSA03 Data Structures, Problem 8. No dependencies; needs Node.js 16 or newer.

    npm start        # then open http://localhost:3000

Structure: `server.js` (static server + REST API), `public/index.html` (the app), `data.json` (created on first save).

API: `GET /api/employees` returns `{saved, rows}`; `PUT /api/employees` stores a JSON array of `[id, name, department, salary]` rows in preorder.

Module 1: Directory Operations (insert, update, delete, search, bulk import, traversal reports, save/rebuild, undo, log).
Module 2: Tree Analysis (level-order, metrics, node depth, successor/predecessor, range query, LCA, kth smallest, animation, department analytics, random vs sorted comparison).
Module 3: Balance Lab and HR Tools (BST vs AVL comparison with rotation counts, sorted-input stress test, one-click rebalancing, department raises, salary bands, CSV export).
