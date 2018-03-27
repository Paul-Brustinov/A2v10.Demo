﻿/**
 * edit customer
 */


const template = {
	events: {
		"Model.load": modelLoad
	},
	validators: {
		"Agent.Name": 'Введите наименование',
		"Agent.Code":
			{ valid: duplicateCode, async: true, msg: "Контрагент с таким кодом ОКПО уже существует" }
	}
};

function modelLoad(root, caller) {
	const ag = root.Agent;
	if (!ag.$isNew) return;
	ag.Type = 'C';
	ag.Kind = 'Customer';
	if (caller.Agents && caller.Agents.$selected) {
		let parentId = caller.Agents.$selected.Id;
		ag.ParentFolder = parentId;
	}
	if (root.Params && root.Params.Name) {
		ag.Name = root.Params.Name;
	}
}


function duplicateCode(agent, code) {
	var vm = agent.$vm;
	if (!agent.Code)
		return true;
	return vm.$asyncValid('duplicateCode', { Code: agent.Code, Id: agent.Id });
}

module.exports = template;