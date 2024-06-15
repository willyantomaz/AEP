class Curso {
    constructor(title, description, duration, teacher, image) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.teacher = teacher;
        this.image = image;
    }
}

class Node {
    constructor(curso) {
        this.curso = curso;
        this.left = null;
        this.right = null;
    }
}

class ArvoreDeBuscaBinaria {
    constructor() {
        this.root = null;
    }

    inserir(curso) {
        const novoNode = new Node(curso);
        if (this.root === null) {
            this.root = novoNode;
        } else {
            this._inserir(this.root, novoNode);
        }
    }

    _inserir(node, novoNode) {
        if (novoNode.curso.title < node.curso.title) {
            if (node.left === null) {
                node.left = novoNode;
            } else {
                this._inserir(node.left, novoNode);
            }
        } else if (novoNode.curso.title > node.curso.title) {
            if (node.right === null) {
                node.right = novoNode;
            } else {
                this._inserir(node.right, novoNode);
            }
        }
    }

    buscar(title) {
        return this._buscar(this.root, title);
    }

    _buscar(node, title) {
        if (node === null || node.curso.title === title) {
            return node;
        }
        if (title < node.curso.title) {
            return this._buscar(node.left, title);
        }
        return this._buscar(node.right, title);
    }

    emOrdem() {
        const elementos = [];
        this._emOrdem(this.root, elementos);
        return elementos;
    }

    _emOrdem(node, elementos) {
        if (node !== null) {
            this._emOrdem(node.left, elementos);
            elementos.push(node.curso);
            this._emOrdem(node.right, elementos);
        }
    }
}