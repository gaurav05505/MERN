# Dyanamic Routing 
In First Principles, a Dynamic Route is a "pattern" rather than a fixed address.

Instead of creating 1,000 separate routes for 1,000 different users, you create one route with a placeholder. That placeholder captures whatever the user types in that part of the URL.

```
// :username is a placeholder
app.get('/profile/:username', (req, res) => {
    const name = req.params.username; 
    res.send(`This is the profile of ${name}`);
});

```