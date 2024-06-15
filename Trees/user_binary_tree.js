class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Node {
    constructor(user) {
        this.user = user;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(user) {
        const newNode = new Node(user);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insert(this.root, newNode);
        }
    }

    _insert(node, newNode) {
        if (newNode.user.name < node.user.name) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insert(node.left, newNode);
            }
        } else if (newNode.user.name > node.user.name) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insert(node.right, newNode);
            }
        }
    }

    search(name) {
        return this._search(this.root, name);
    }

    _search(node, name) {
        if (node === null || node.user.name === name) {
            return node;
        }
        if (name < node.user.name) {
            return this._search(node.left, name);
        }
        return this._search(node.right, name);
    }

    inOrder() {
        const users = [];
        this._inOrder(this.root, users);
        return users;
    }

    _inOrder(node, users) {
        if (node !== null) {
            this._inOrder(node.left, users);
            users.push(node.user);
            this._inOrder(node.right, users);
        }
    }
}