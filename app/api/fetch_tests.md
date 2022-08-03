// -------------------------fetch post notebook
fetch('/api/notebooks', { method: "POST", headers: { "Content-Type": "application/json", "csrf_token": "ImNiOGI0ZTk4YjNkMzhiNTgwYWExNTJkNTUxY2EyY2FkMjcwN2E5NDIi.YuleKw.4ZHqQEKOfEui25rhZNhb3qBHGyo" }, body: JSON.stringify({ title: 'notebook create test'  }) }).then(res => res.json()).then(data => console.log(data));


// -------------------------fetch put notebook
fetch('/api/notebooks/3', { method: "PUT", headers: { "Content-Type": "application/json", "csrf_token": "ImNiOGI0ZTk4YjNkMzhiNTgwYWExNTJkNTUxY2EyY2FkMjcwN2E5NDIi.YuleKw.4ZHqQEKOfEui25rhZNhb3qBHGyo" }, body: JSON.stringify({ title: 'notebook update title'  }) }).then(res => res.json()).then(data => console.log(data));


// -------------------------fetch delete notebook
fetch('/api/notebooks/3', { method: "DELETE", headers: { "Content-Type": "application/json", "csrf_token": "ImNiOGI0ZTk4YjNkMzhiNTgwYWExNTJkNTUxY2EyY2FkMjcwN2E5NDIi.YuleKw.4ZHqQEKOfEui25rhZNhb3qBHGyo" } }).then(res => res.json()).then(data => console.log(data));

// -------------------------fetch post note
fetch('/api/notes', { method: "POST", headers: { "Content-Type": "application/json", "csrf_token": "ImNiOGI0ZTk4YjNkMzhiNTgwYWExNTJkNTUxY2EyY2FkMjcwN2E5NDIi.YuleKw.4ZHqQEKOfEui25rhZNhb3qBHGyo" }, body: JSON.stringify({ title: 'note create test', content:'text text text here here here', notebook_id:2  }) }).then(res => res.json()).then(data => console.log(data));

// -------------------------fetch put note
fetch('/api/notes/6', { method: "PUT", headers: { "Content-Type": "application/json", "csrf_token": "ImNiOGI0ZTk4YjNkMzhiNTgwYWExNTJkNTUxY2EyY2FkMjcwN2E5NDIi.YuleKw.4ZHqQEKOfEui25rhZNhb3qBHGyo" }, body: JSON.stringify({ title: 'note edit test', content:'update note', notebook_id:1  }) }).then(res => res.json()).then(data => console.log(data));

// -------------------------fetch delete notebook
fetch('/api/notes/6', { method: "DELETE", headers: { "Content-Type": "application/json", "csrf_token": "ImNiOGI0ZTk4YjNkMzhiNTgwYWExNTJkNTUxY2EyY2FkMjcwN2E5NDIi.YuleKw.4ZHqQEKOfEui25rhZNhb3qBHGyo" } }).then(res => res.json()).then(data => console.log(data));