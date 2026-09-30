const { Op } = require("sequelize");
const Luminaire = require('../../models/luminaire.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }
    const luminaire = {
        type: req.body.type,
        power: req.body.power,
        ledCount: req.body.ledCount,
        manufacturer: req.body.manufacturer
    };
    Luminaire.create(luminaire)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    const { search, sort } = req.query;

    const condition = search ? { manufacturer: { [Op.like]: `${search}%` } } : null;

    let order = [];
    if (sort === "0") {
        order = [['type', 'ASC']];
    } else if (sort === "1") {
        order = [['power', 'DESC']];
    } else if (sort === "2") {
        order = [['ledCount', 'DESC']];
    }

    Luminaire.findAll({ 
        where: condition, 
        order: order.length ? order : undefined 
    })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.getTotalPower = (req, res) => {
    const { search } = req.query;
    const condition = search ? { manufacturer: { [Op.like]: `${search}%` } } : null;

    Luminaire.sum('power', { where: condition })
        .then(sum => res.send({ totalPower: sum || 0 }))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Luminaire.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `Cannot find item with id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Error retrieving item with id=" + id }));
};

exports.update = (req, res) => {
    const id = req.params.id;
    Luminaire.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Item was updated successfully" });
            else res.send({ message: `Cannot update item with id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Error updating item with id=" + id }));
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Luminaire.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Item was deleted successfully." });
            else res.send({ message: `Cannot delete item with id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Could not delete item with id=" + id }));
};