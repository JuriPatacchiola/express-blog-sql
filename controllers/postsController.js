const posts = require("../data/posts");

function index(req, res) {
    const { tag } = req.query;

    if (tag) {
        const filtered = posts.filter(post =>
            post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        );
        return res.json(filtered);
    }

    res.json(posts);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    res.json(post);
}

function store(req, res) {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags || []
    };

    posts.push(newPost);

    res.status(201).json(newPost);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    post.image = req.body.image ?? post.image;
    post.tags = req.body.tags ?? post.tags;

    res.json(post);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    posts.splice(index, 1);

    res.status(204).send();
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
