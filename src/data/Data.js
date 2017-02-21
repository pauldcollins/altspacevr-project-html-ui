import db from "./db.json"

const retrieveData = (function () {
	let resolveData;
	const _retrieveData = new Promise(function (resolve) {
		resolveData = resolve;
	});
	resolveData(db);

	return _retrieveData;
}());

const Model = {};
Model.modelName = 'Model';
Model.getAll = function () {
	const that = this;
	return new Promise(function (fulfill) {
		retrieveData.then(function (data) {
			const modelData = data[that.modelName];
			const values = [];
			for (let key in modelData) {
				if (modelData.hasOwnProperty(key)) {
					values.push(modelData[key]);
				}
			}
			fulfill(values);
		});
	});
};

Model.getById = function (id) {
	const that = this;
	return new Promise(function (fulfill) {
		retrieveData.then(function (data) {
			fulfill(data[that.modelName][id]);
		});
	});
};

Model.updateById = function (id, data) {
	const that = this;
	return new Promise(function (fulfill) {
		retrieveData.then(function () {
			db[that.modelName][id] = data;
			fulfill(data);
		});
	});
};

Model.create = function (data) {
	const that = this;
	return new Promise(function (fulfill) {
		retrieveData.then(function () {
			let biggestId;
			const store = db[that.modelName];
			for (let key in store) {
				if (!biggestId || key > biggestId) {
					biggestId = key;
				}
			}
			const newId = Number(biggestId) + 1;
			data.id = newId;
			that.updateById(newId, data).then(function () {
				fulfill(data);
			});
		});
	});
};

Model.deleteById = function (id) {
	const that = this;
	return new Promise(function (fulfill) {
		retrieveData.then(function () {
			delete db[that.modelName][id];
			fulfill();
		});
	});
};

var extend = function (dest, src) {
	for (let key in src) {
		if (src.hasOwnProperty(key)) {
			dest[key] = src[key];
		}
	}
};

const User = {};
extend(User, Model);
User.modelName = 'User';

const Space = {};
extend(Space, Model);
Space.modelName = 'Space';

export default {
	User,
	Space
}
