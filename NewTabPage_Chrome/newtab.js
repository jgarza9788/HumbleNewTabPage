'use strict';

// render a single bookmark node
// function render(node, target) {
// 	var li = document.createElement('li');
// 	var a = document.createElement('a');

// 	var url = node.url || node.appLaunchUrl;
// 	if (url) a.href = url;
// 	a.innerText = node.title || node.name || '';
// 	if (node.tooltip) a.title = node.tooltip;
// 	setClass(a, node);

// 	a.insertBefore(getIcon(node), a.firstChild);

// 	if (node.action) {
// 		a.onclick = function(event) {
// 			return node.action(event);
// 		};
// 	} else if (url) {
// 		var newtab = getConfig('newtab');
// 		if (newtab == 1) {
// 			// new foreground tab
// 			a.target = '_blank';
// 		} else if (newtab == 2) {
// 			// new background tab
// 			a.onclick = function(event) {
// 				chrome.tabs.getCurrent(function(tab) {
// 					chrome.tabs.create({url: url, active: false, openerTabId: tab.id});
// 				});
// 				return false;
// 			};
// 		}
// 		// fix opening chrome:// and file:/// urls
// 		var urlStart = url.substring(0, 6);
// 		if (urlStart === 'chrome' || urlStart === 'file:/')
// 			a.onclick = function() {
// 				openLink(node, newtab);
// 				return false;
// 			};

// 	} else if (!node.children && !node.type)
// 		a.style.pointerEvents = 'none';

// 	li.appendChild(a);

// 	// folder
// 	if (node.children) {
// 		// render children
// 		if (localStorage.getItem('open.' + node.id)) {
// 			setClass(a, node, true);
// 			a.open = true;
// 			getChildrenFunction(node)(function(result) {
// 				renderAll(result, li);
// 			});
// 		}

// 		// click handlers
// 		addFolderHandlers(node, a);
// 		enableDragFolder(node, a);

// 	} else if (node.type)
// 		addAppHandlers(node, a);

// 	target.appendChild(li);
// 	return li;
// }

// render an array of bookmark nodes
// function renderAll(nodes, target, toplevel) {
// 	var ul = document.createElement('ul');
// 	for (var i = 0; i < nodes.length; i++) {
// 		var node = nodes[i];
// 		// skip extensions and duplicated child folders
// 		if (toplevel || !coords[node.id])
// 			render(node, ul);
// 	}
// 	if (ul.childNodes.length === 0)
// 		render({ id: 'empty', title: '< Empty >' }, ul);
// 	if (toplevel)
// 		target.appendChild(ul);
// 	else {
// 		// wrap child ul for animation
// 		var wrap = document.createElement('div');
// 		wrap.appendChild(ul);
// 		target.appendChild(wrap);
// 	}
// 	return ul;
// }

// render column with given index
// function renderColumn(index, target) {
// 	var ids = columns[index];
// 	if (ids.length == 1 && ids[0] != 'weather' && !getConfig('show_root'))
// 		getChildrenFunction({id: ids[0]})(function(result) {
// 			renderAll(result, target);
// 			addColumnHandlers(index, target);
// 		});
// 	else if (ids.length > 0) {
// 		var i = 0;
// 		var nodes = [];
// 		// get all nodes for column
// 		var callback = function(result) {
// 			for (var j = 0; j < result.length; j++)
// 				nodes.push(result[j]);
// 			i++;
// 			if (i < ids.length)
// 				getSubTree(ids[i], callback);
// 			else {
// 				// render node list
// 				renderAll(nodes, target, true);
// 				addColumnHandlers(index, target);
// 			}
// 		};
// 		getSubTree(ids[i], callback);
// 	}
// }

// render all columns to main div
// function renderColumns() {
// 	// clear main div
// 	var target = document.getElementById('main');
// 	while (target.hasChildNodes())
// 		target.removeChild(target.lastChild);

// 	// render columns
// 	for (var i = 0; i < columns.length; i++) {
// 		var column = document.createElement('div');
// 		column.className = 'column';
// 		column.style.width = (1 / columns.length) * 100 + '%';

// 		// enable drag and drop
// 		enableDragColumn(i, column);

// 		target.appendChild(column);
// 		renderColumn(i, column);
// 	}

// 	enableDragDrop();
// }

// enables click and context menu for given folder
// function addFolderHandlers(node, a) {
// 	// click handler
// 	a.onclick = function() {
// 		toggle(node, a, getChildrenFunction(node));
// 		return false;
// 	};

// 	// context menu handler
// 	var items = getMenuItems(node);

// 	// column layout items
// 	if (!getConfig('lock')) {
// 		items.push(null);// spacer
// 		items.push({
// 			label: 'Create new column',
// 			action: function() {
// 				addColumn([node.id]);
// 			}
// 		});

// 		if (coords[node.id]) {
// 			var pos = coords[node.id];
// 			if (pos.y > 0)
// 				items.push({
// 					label: 'Move folder up',
// 					action: function() {
// 						addRow(node.id, pos.x, pos.y - 1);
// 					}
// 				});
// 			if (pos.y < columns[pos.x].length - 1)
// 				items.push({
// 					label: 'Move folder down',
// 					action: function() {
// 						addRow(node.id, pos.x, pos.y + 2);
// 					}
// 				});
// 			if (pos.x > 0)
// 				items.push({
// 					label: 'Move folder left',
// 					action: function() {
// 						addRow(node.id, pos.x - 1);
// 					}
// 				});
// 			if (pos.x < columns.length - 1)
// 				items.push({
// 					label: 'Move folder right',
// 					action: function() {
// 						addRow(node.id, pos.x + 1);
// 					}
// 				});
// 			if (root.indexOf(node.id) < 0)
// 				items.push({
// 					label: 'Remove folder',
// 					action: function() {
// 						removeRow(pos.x, pos.y);
// 					}
// 				});
// 		}
// 	}

// 	a.oncontextmenu = function(event) {
// 		renderMenu(items, event.pageX, event.pageY);
// 		return false;
// 	};
// }

// enables click and context menu for given app
// function addAppHandlers(node, a) {
// 	if (!node.appLaunchUrl && node.id) {
// 		a.onclick = function() {
// 			chrome.management.launchApp(node.id);
// 			return false;
// 		};
// 	}
// 	a.oncontextmenu = function (event) {
// 		var menuItems = [];

// 		if (node.appLaunchUrl) {
// 			menuItems.push({
// 				label: 'Open in new tab',
// 				action: function () {
// 					openLink(node, 1);
// 				}
// 			});
// 		}
// 		if (node.optionsUrl) {
// 			menuItems.push({
// 				label: 'Options',
// 				action: function () {
// 					window.location = node.optionsUrl;
// 				}
// 			});
// 		}
// 		if (node.homepageUrl) {
// 			menuItems.push({
// 				label: 'Open in Web Store',
// 				action: function () {
// 					window.location = node.homepageUrl;
// 				}
// 			});
// 		}
// 		if (node.mayDisable) {
// 			menuItems.push({
// 				label: 'Uninstall',
// 				action: function () {
// 					if (confirm('Uninstall "' + a.innerText + '"?'))
// 						chrome.management.uninstall(node.id, chrome.tabs.reload);
// 				}
// 			});
// 		}

// 		if (menuItems.length) {
// 			renderMenu(menuItems, event.pageX, event.pageY);
// 			return false;
// 		}
// 	};

// 	// enable drag and drop ordering of app. TODO refactor
// 	a.draggable = true;
// 	a.ondragstart = function(event) {
// 		dragIds = [node.id];
// 		event.stopPropagation();
// 		event.dataTransfer.effectAllowed = 'move copy';
// 		this.classList.add('dragstart');
// 	};
// 	a.ondragend = function(event) {
// 		dragIds = null;
// 		this.classList.remove('dragstart');
// 		clearDropTarget();
// 	};
// 	var li = a.parentNode;
// 	li.ondragover = function(event) {
// 		event.preventDefault();
// 		event.stopPropagation();
// 		event.dataTransfer.dropEffect = 'move';
// 		// highlight drop target
// 		var target = event.target;
// 		while (target && target.tagName != 'A')
// 			target = target.parentNode;

// 		if (target) {
// 			clearDropTarget();
// 			dropTarget = target;
// 			var bordercss = 'solid 2px ' + getConfig('font_color');
// 			if (isAbove(event.pageY, target)) {
// 				target.style.borderBottom = bordercss;
// 				target.style.margin = '0 0 -2px 0';
// 			} else {
// 				target.style.borderTop = bordercss;
// 				target.style.margin = '-2px 0 0 0';
// 			}
// 		}
// 		return false;
// 	};

// 	li.ondragleave = function(event) {
// 		clearDropTarget();
// 	};

// 	li.ondrop = function(event) {
// 		event.stopPropagation();

// 		var target = event.target;
// 		while (target && target.tagName != 'A')
// 			target = target.parentNode;

// 		if (!target)
// 			return false;

// 		// saves app order to local storage
// 		var index = appsOrder.indexOf(node.id);
// 		var oldIndex = appsOrder.indexOf(dragIds[0]);
// 		if (index == -1 || oldIndex == -1)
// 			return false;

// 		if (isAbove(event.pageY, target))
// 			index++;

// 		if (oldIndex < index)
// 			index--;

// 		appsOrder.splice(oldIndex, 1);
// 		appsOrder.splice(index, 0, dragIds[0]);

// 		localStorage.setItem('apps.order', JSON.stringify(appsOrder));

// 		// refresh
// 		var parent = li.parentNode.parentNode;
// 		parent.removeChild(li.parentNode);
// 		getChildrenFunction({id: 'apps'})(function(result) {
// 			renderAll(result, parent);
// 		});
// 		return false;
// 	};
// }

// enables context menu for given column
// function addColumnHandlers(index, ul) {
// 	var items = [];
// 	var ids = columns[index];

// 	// single folder items
// 	if (ids.length == 1)
// 		items = getMenuItems({id: ids[0]});

// 	// column layout items
// 	if (!getConfig('lock') && columns.length > 1) {
// 		items.push(null);// spacer
// 		if (index > 0)
// 			items.push({
// 				label: 'Move column left',
// 				action: function() {
// 					addColumn(ids, index - 1);
// 				}
// 			});
// 		if (index < columns.length - 1)
// 			items.push({
// 				label: 'Move column right',
// 				action: function() {
// 					addColumn(ids, index + 2);
// 				}
// 			});
// 		items.push({
// 			label: 'Remove column',
// 			action: function() {
// 				removeColumn(index);
// 			}
// 		});
// 		if (ids.length == 1) {
// 			if (index > 0)
// 				items.push({
// 					label: 'Move folder left',
// 					action: function() {
// 						addRow(ids[0], index - 1);
// 					}
// 				});
// 			if (index < columns.length - 1)
// 				items.push({
// 					label: 'Move folder right',
// 					action: function() {
// 						addRow(ids[0], index + 1);
// 					}
// 				});
// 		}
// 	}

// 	if (items.length > 0)
// 		ul.oncontextmenu = function(event) {
// 			if (event.target.tagName == 'A' || event.target.parentNode.tagName == 'A')
// 				return true;
// 			renderMenu(items, event.pageX, event.pageY);
// 			return false;
// 		};
// }

// gets context menu items for given node
// function getMenuItems(node) {
// 	var items = [];
// 	if (node.id == 'weather')
// 		items.push({
// 			label: 'Update weather',
// 			action: function() {
// 				refreshWeather();
// 			}
// 		});
// 	else
// 		items.push({
// 			label: 'Open all links in folder',
// 			action: function() {
// 				openLinks(node);
// 			}
// 		});
// 	if (node.id == 'closed')
// 		items.push({
// 			label: 'Clear browsing data',
// 			action: function() {
// 				openLink({ url: 'chrome://settings/clearBrowserData' }, 1);
// 			}
// 		});
// 	if (node.id == 'apps')
// 		items.push({
// 			label: 'Manage apps',
// 			action: function() {
// 				openLink({ url: 'chrome://apps' }, 1);
// 			}
// 		});
// 	if (node.id == 'devices')
// 		items.push({
// 			label: 'History',
// 			action: function() {
// 				openLink({ url: 'chrome://history' }, 1);
// 			}
// 		});
// 	if (Number(node.id))
// 		items.push({
// 			label: 'Edit bookmarks',
// 			action: function() {
// 				openLink({ url: 'chrome://bookmarks/#' + node.id }, 1);
// 			}
// 		});
// 	return items;
// }

// wraps click handler for menu items
// function onMenuClick(item) {
// 	return function() {
// 		item.action();
// 		return false;
// 	};
// }

// renders a popup menu at given coordinates
// function renderMenu(items, x, y) {
// 	var ul = document.createElement('ul');
// 	ul.className = 'menu';
// 	for (var i = 0; i < items.length; i++) {
// 		var li = document.createElement('li');
// 		if (items[i]) {
// 			var a = document.createElement('a');
// 			a.href="#";
// 			a.innerText = items[i].label;
// 			a.onclick = onMenuClick(items[i]);

// 			li.appendChild(a);
// 		} else if (i > 0 && i < items.length - 1)
// 			li.appendChild(document.createElement('hr'));
// 		else
// 			continue;

// 		ul.appendChild(li);
// 	}
// 	document.body.appendChild(ul);
// 	ul.style.left = Math.max(Math.min(x, window.innerWidth + window.scrollX - ul.clientWidth), 0) + 'px';
// 	ul.style.top = Math.max(Math.min(y, window.innerHeight + window.scrollY - ul.clientHeight), 0) + 'px';
// 	ul.onmousedown = function(event) {
// 		event.stopPropagation();
// 		return true;
// 	};

// 	setTimeout(function() {
// 		document.onclick = function() {
// 			closeMenu(ul);
// 			return true;
// 		};
// 		document.onmousedown = function() {
// 			closeMenu(ul);
// 			return true;
// 		};
// 		document.oncontextmenu = function() {
// 			closeMenu(ul);
// 			return true;
// 		};
// 		document.onkeydown = function(event) {
// 			if (event.keyCode == 27)
// 				closeMenu(ul);
// 			return true;
// 		};
// 	}, 0);
// 	return ul;
// }

// removes the given popup menu
// function closeMenu(ul) {
// 	document.body.removeChild(ul);
// 	document.onclick = null;
// 	document.onmousedown = null;
// 	document.oncontextmenu = null;
// 	document.onkeydown = null;
// }

// var dragIds;

// enable drag and drop of column
// function enableDragColumn(id, column) {
// 	if (getConfig('lock'))
// 		return;

// 	column.draggable = true;

// 	column.ondragstart = function(event) {
// 		dragIds = columns[id];
// 		event.dataTransfer.effectAllowed = 'move';
// 		this.classList.add('dragstart');
// 	};
// 	column.ondragend = function(event) {
// 		dragIds = null;
// 		this.classList.remove('dragstart');
// 		clearDropTarget();
// 	};
// }

// var dropTarget;

// enable drag and drop of folder
// function enableDragFolder(node, a) {
// 	if (getConfig('lock'))
// 		return;

// 	a.draggable = true;
// 	a.ondragstart = function(event) {
// 		dragIds = [node.id];
// 		event.stopPropagation();
// 		event.dataTransfer.effectAllowed = 'move copy';
// 		this.classList.add('dragstart');
// 	};
// 	a.ondragend = function(event) {
// 		dragIds = null;
// 		this.classList.remove('dragstart');
// 		clearDropTarget();
// 	};
// }

// init drag and drop handlers
// function enableDragDrop() {
// 	var main = document.getElementById('main');

// 	if (getConfig('lock')) {
// 		main.ondragover = null;
// 		main.ondragleave = null;
// 		main.ondrop = null;
// 		return;
// 	}

// 	main.ondragover = function(event) {
// 		event.preventDefault();
// 		event.dataTransfer.dropEffect = 'move';
// 		// highlight drop target
// 		var target = getDropTarget(event);
// 		if (target) {
// 			clearDropTarget();
// 			dropTarget = target;
// 			var bordercss = 'solid 2px ' + getConfig('font_color');
// 			if (target.tagName == 'LI' || target.tagName == 'UL') {
// 				if (isAbove(event.pageY, target)) {
// 					target.style.borderBottom = bordercss;
// 					target.style.margin = '0 0 -2px 0';
// 				} else {
// 					target.style.borderTop = bordercss;
// 					target.style.margin = '-2px 0 0 0';
// 				}
// 			} else if (target.className == 'column') {
// 				if (event.pageX - target.offsetLeft > target.clientWidth / 2) {
// 					target.style.borderRight = bordercss;
// 					target.style.margin = '0';
// 				} else {
// 					target.style.borderLeft = bordercss;
// 					target.style.margin = '0 2px 0 -2px';
// 				}
// 			}
// 		}
// 		return false;
// 	};

// 	main.ondragleave = function(event) {
// 		clearDropTarget();
// 	};

// 	main.ondrop = function(event) {
// 		event.stopPropagation();

// 		var target = getDropTarget(event);
// 		if (!target)
// 			return false;

// 		// calculate drop coordinates
// 		var x = getDropX(target, event);
// 		var y = getDropY(target, event);

// 		if (dragIds.length == 1 && y != null)
// 			addRow(dragIds[0], x, y);
// 		else {
// 			if (event.pageX - target.offsetLeft > target.clientWidth / 2)
// 				x++;
// 			addColumn(dragIds, x);
// 		}

// 		return false;
// 	};
// }

// gets proper drop target element
// function getDropTarget(event) {
// 	if (!dragIds)
// 		return null;
// 	var target = event.target;
// 	if (target && (target.tagName == 'A' || target.parentNode.tagName == 'A') && dragIds.length == 1) {
// 		// get parent folder until toplevel
// 		while (target &&
// 			target.parentNode.parentNode &&
// 			target.parentNode.parentNode.className != 'column') {
// 			// target should be LI
// 			target = target.parentNode;
// 		}
// 		// if single-folder column, get the UL
// 		if (target && target.tagName == 'LI' &&
// 			columns[getDropX(target, event)].length == 1)
// 			target = target.parentNode;
// 		// target should be LI or UL by here...
// 	} else
// 		while (target && target.className != 'column')
// 			target = target.parentNode;// target column

// 	return target;
// }

// gets x coordinate of drop target
// function getDropX(target, event) {
// 	var x = null;
// 	while (target && target.className != 'column')
// 		target = target.parentNode;
// 	if (target) {
// 		x = 0;
// 		for (; target.previousSibling; x++)
// 			target = target.previousSibling;
// 	}
// 	return x;
// }

// gets y coordinate of drop target
// function getDropY(target, event) {
// 	var y = null;
// 	if (target.tagName == 'LI') {
// 		y = 0;
// 		if (isAbove(event.pageY, target))
// 			y++;
// 		for (; target.previousSibling; y++)
// 			target = target.previousSibling;
// 	} else if (target.tagName == 'UL') {
// 		y = 0;
// 		if (isAbove(event.pageY, target))
// 			y++;
// 	}
// 	return y;
// }

// returns true if y position is above target element midpoint
// function isAbove(pageY, target) {
// 	return pageY - window.scrollY - target.getBoundingClientRect().top > target.clientHeight / 2;
// }

// clears droptarget styles
// function clearDropTarget() {
// 	if (dropTarget) {
// 		dropTarget.style.border = null;
// 		dropTarget.style.margin = null;
// 	}
// 	dropTarget = null;
// }

// gets function that returns children of node
// function getChildrenFunction(node) {
// 	switch(node.id) {
// 		case 'top':
// 			return function(callback) {
// 				if (chrome.topSites)
// 					chrome.topSites.get(function(result) {
// 						callback(result.slice(0, getConfig('number_top')));
// 					});
// 				else
// 					callback([]);
// 			};
// 		case 'apps':
// 			return function(callback) {
// 				getApps(function(result) {
// 					callback(result);
// 				});
// 			};
// 		case 'recent':
// 			return function(callback) {
// 				chrome.bookmarks.getRecent(getConfig('number_recent'), function(result) {
// 					callback(result);
// 				});
// 			};
// 		case 'closed':
// 			return function(callback) {
// 				getClosed(function(result) {
// 					callback(result);
// 				});
// 			};
// 		case 'devices':
// 			return function(callback) {
// 				getDevices(function(result) {
// 					callback(result);
// 				});
// 			};
// 		case 'weather':
// 			if (node.children)
// 				return function(callback) {
// 					callback(node.children);
// 				};
// 			else
// 				return function(callback) {
// 					getWeather(function(result) {
// 						callback(result[0].children);
// 					});
// 				};
// 		default:
// 			if  (node.children)
// 				return function(callback) {
// 					callback(node.children);
// 				};
// 			else
// 				return function(callback) {
// 					chrome.bookmarks.getSubTree(node.id, function(result) {
// 						if (result)
// 							callback(result[0].children);
// 						else {
// 							// remove missing bookmark locations
// 							if (coords[node.id])
// 								removeRow(coords[node.id].x, coords[node.id].y);
// 						}
// 					});
// 				};
// 	}
// }

// gets the subtree for given id
// function getSubTree(id, callback) {
// 	switch(id) {
// 		case 'top':
// 			callback([{ title: 'Most visited', id: 'top', children: true}]);
// 			break;
// 		case 'apps':
// 			callback([{ title: 'Apps', id: 'apps', children: true }]);
// 			break;
// 		case 'recent':
// 			callback([{ title: 'Recent bookmarks', id: 'recent', children: true }]);
// 			break;
// 		case 'closed':
// 			callback([{ title: 'Recently closed', id: 'closed', children: true }]);
// 			break;
// 		case 'devices':
// 			callback([{ title: 'Other devices', id: 'devices', children: true }]);
// 			break;
// 		case 'weather':
// 			getWeather(function(result) {
// 				callback(result);
// 			});
// 			break;
// 		default:
// 			chrome.bookmarks.getSubTree(id, function(result) {
// 				if (result)
// 					callback(result);
// 				else {
// 					// remove missing bookmark locations
// 					if (coords[id])
// 						removeRow(coords[id].x, coords[id].y);
// 				}
// 			});
// 	}
// }

// // sets css classes for node
// function setClass(target, node, isopen) {
// 	if (node.className)
// 		target.classList.add(node.className);
// 	if (node.children)
// 		target.classList.add('folder');
// 	if (isopen)
// 		target.classList.add('open');
// 	else
// 		target.classList.remove('open');

// 	switch(node.id) {
// 		case 'top':
// 		case 'apps':
// 		case 'recent':
// 		case 'closed':
// 		case 'devices':
// 		case 'weather':
// 		case 'empty':
// 			target.classList.add(node.id);
// 	}
// }

// gets best icon for a node
// function getIcon(node) {
// 	var url = null,
// 		url2x = null;
// 	if (node.icons) {
// 		var size;
// 		for (var i in node.icons) {
// 			var iconInfo = node.icons[i];
// 			if (iconInfo.url && (!size || (iconInfo.size < size && iconInfo.size > 15))) {
// 				url = iconInfo.url;
// 				if (iconInfo.size > 31) url2x = iconInfo.url;
// 				size = iconInfo.size;
// 			}
// 		}
// 	} else if (node.icon)
// 		url = node.icon;
// 	else if (node.url || node.appLaunchUrl) {
// 		url = 'chrome://favicon/' + (node.url || node.appLaunchUrl);
// 		url2x = 'chrome://favicon/size/16@2x/' + (node.url || node.appLaunchUrl);
// 	}

// 	var icon = document.createElement(url ? 'img' : 'div');
// 	icon.className = 'icon';
// 	icon.src = url;
// 	if (url2x) icon.srcset = url2x + ' 2x';
// 	icon.alt = '';
// 	return icon;
// }

// toggle folder open state
// function toggle(node, a) {
// 	var isopen = localStorage.getItem('open.' + node.id);
// 	setClass(a, node, !isopen);
// 	a.open = !isopen;
// 	if (isopen) {
// 		// close folder
// 		localStorage.removeItem('open.' + node.id);
// 		if (a.nextSibling){
// 			// auto-close child folders
// 			if (getConfig('auto_close')) {
// 				var children = (a.nextSibling.tagName == 'DIV' ? a.nextSibling.firstChild : a.nextSibling).children;
// 				for (var i=0; i<children.length; i++) {
// 					var child = children[i].firstChild;
// 					if (child.open)
// 						child.onclick();
// 				}
// 			}
// 			// close folder
// 			animate(node, a, isopen);
// 		}
// 	} else {
// 		// open folder
// 		localStorage.setItem('open.' + node.id, true);
// 		// auto-close sibling folders
// 		if (getConfig('auto_close')) {
// 			var siblings = a.parentNode.parentNode.children;
// 			for (var i=0; i<siblings.length; i++) {
// 				var sibling = siblings[i].firstChild;
// 				if (sibling != a && sibling.open)
// 					sibling.onclick();
// 			}
// 		}
// 		// open folder
// 		if (a.nextSibling)
// 			animate(node, a, isopen);
// 		else
// 			getChildrenFunction(node)(function(result) {
// 				if (!a.nextSibling && localStorage.getItem('open.' + node.id)) {
// 					renderAll(result, a.parentNode);
// 					animate(node, a, isopen);
// 				}
// 			});
// 	}
// }

// smoothly open or close folder
// function animate(node, a, isopen) {
// 	// TODO: fix nested animations
// 	// wrapper needed for inner height value
// 	var wrap = a.nextSibling;
// 	if (a.toggleAction) {
// 		// clear last animation
// 		clearTimeout(a.toggleHandle);
// 		a.toggleAction = null;
// 	} else {
// 		// start animation
// 		wrap.style.height = isopen ? wrap.firstChild.clientHeight + 'px' : 0;
// 		wrap.style.opacity = isopen ? 1 : 0;
// 	}

// 	setTimeout(function() {
// 		wrap.className = 'wrap';
// 		wrap.style.height = isopen ? 0 : wrap.firstChild.clientHeight + 'px';
// 		wrap.style.opacity = isopen ? 0 : 1;
// 		wrap.style.pointerEvents = isopen ? 'none' : null;
// 	}, 0);

// 	a.toggleAction = function() {
// 		if (isopen)
// 			a.parentNode.removeChild(wrap);
// 		else {
// 			wrap.className = null;
// 			wrap.removeAttribute('style');
// 		}
// 		a.toggleAction = null;
// 	};
// 	var duration = scale(getConfig('slide'), .2, 1) * 1000;
// 	a.toggleHandle = setTimeout(a.toggleAction, duration);
// }

// opens immediate children of given node in new tabs
// function openLinks(node) {
// 	chrome.tabs.getCurrent(function(tab) {
// 		getChildrenFunction(node)(function(result) {
// 			for (var i = 0; i < result.length; i++)
// 				openLink(result[i], 2);
// 		});
// 	});
// }

// opens given node
// function openLink(node, newtab) {
// 	var url = node.url || node.appLaunchUrl;
// 	if (url) {
// 		chrome.tabs.getCurrent(function(tab) {
// 			if (newtab)
// 				chrome.tabs.create({url: url, active: (newtab == 1), openerTabId: tab.id});
// 			else
// 				chrome.tabs.update(tab.id, {url: url});
// 		});
// 	}
// }

// var columns; // columns[x][y] = id
// var root; // root[] = id
// var coords; // coords[id] = {x:x, y:y}
// var special = ['top', 'apps', 'recent', 'weather', 'closed', 'devices'];

// ensure root folders are included
// function verifyColumns() {
// 	// default layout
// 	if (columns.length === 0) {
// 		columns.push([]);
// 		columns.push(special.filter(function(a) {
// 			return getConfig('show_' + a) != false;
// 		}));
// 	}

// 	// find missing root items
// 	var missing = root.slice(0);
// 	for (var x = 0; x < columns.length; x++) {
// 		for (var y = 0; y < columns[x].length; y++) {
// 			var i = missing.indexOf(columns[x][y]);
// 			if (i > -1)
// 				missing.splice(i, 1);
// 		}
// 	}

// 	// add missing root items
// 	var column = columns[0];
// 	for (var i = 0; i < missing.length; i++) {
// 		if (getConfig('show_' + missing[i]) != false)
// 			column.push(missing[i]);
// 	}

// 	// populate coordinate map
// 	coords = {};
// 	for (var x = 0; x < columns.length; x++) {
// 		for (var y = 0; y < columns[x].length; y++) {
// 			coords[columns[x][y]] = { x: x, y: y};
// 		}
// 		if (columns[x].length === 0) {
// 			columns.splice(x, 1);
// 			x--;
// 		}
// 	}
// }

// load columns from storage or default
// function loadColumns() {
// 	columns = [];
// 	for (var x = 0; ; x++) {
// 		var row = [];
// 		for (var y = 0; ; y++) {
// 			var id = localStorage.getItem('column.' + x + '.' + y);
// 			if (id) row.push(id); else break;
// 		}
// 		if (row.length > 0) columns.push(row); else break;
// 	}

// 	if (root) {
// 		verifyColumns();
// 		renderColumns();
// 	} else {
// 		chrome.bookmarks.getTree(function(result) {
// 			// init root nodes
// 			var nodes = result[0].children;
// 			root = special.slice(0);

// 			for (var i = 0; i < nodes.length; i++)
// 				root.push(nodes[i].id);

// 			verifyColumns();
// 			renderColumns();
// 		});
// 	}
// }

// saves current column configuration to storage
// function saveColumns() {
// 	// clear previous config
// 	for (var x = 0; ; x++) {
// 		for (var y = 0; ; y++) {
// 			var id = localStorage.getItem('column.' + x + '.' + y);
// 			if (id)
// 				localStorage.removeItem('column.' + x + '.' + y);
// 			else
// 				break;
// 		}
// 		if (y === 0)
// 			break;
// 	}
// 	verifyColumns();
// 	// save new config
// 	for (var x = 0; x < columns.length; x++) {
// 		for (var y = 0; y < columns[x].length; y++) {
// 			localStorage.setItem('column.' + x +'.' + y, columns[x][y]);
// 		}
// 	}
// 	// refresh
// 	loadColumns();
// }

// creates and saves a new column
// function addColumn(ids, index) {
// 	var column = ids.slice(0);
// 	// remove previous locations
// 	for (var x = 0; x < columns.length; x++) {
// 		for (var y = 0; y < columns[x].length; y++ ) {
// 			if (ids.indexOf(columns[x][y]) > -1) {
// 				columns[x].splice(y, 1);
// 				y--;
// 			}
// 		}
// 	}
// 	// insert new id
// 	if (index == null)
// 		index = columns.length;
// 	columns.splice(Math.min(index, columns.length), 0, column);

// 	// save
// 	saveColumns();
// }

// removes given column
// function removeColumn(index) {
// 	columns.splice(index, 1);
// 	saveColumns();
// }

// creates and saves a new row
// function addRow(id, xpos, ypos) {
// 	if (ypos == null)
// 		ypos = columns[xpos].length;

// 	// remove previous locations
// 	for (var x = 0; x < columns.length; x++) {
// 		var i = columns[x].indexOf(id);
// 		if (i > -1) {
// 			columns[x].splice(i, 1);
// 			if (x == xpos && ypos > i)
// 				ypos--;
// 		}
// 		if (columns[x].length === 0) {
// 			columns.splice(x, 1);
// 			x--;
// 			if (xpos > x)
// 				xpos--;
// 		}
// 	}
// 	// insert new id
// 	columns[xpos].splice(Math.min(ypos, columns[xpos].length), 0, id);

// 	// save
// 	saveColumns();
// }

// removes given row
// function removeRow(xpos, ypos) {
// 	columns[xpos].splice(ypos, 1);
// 	saveColumns();
// }

// var appsOrder;

// gets apps
// function getApps(callback) {
// 	chrome.management.getAll(function(result) {
// 		result = result.filter(function(a) {
// 			return a.enabled && a.type !== 'extension' && a.type !== 'theme' && a.isApp !== false &&
// 				a.id !== 'nmmhkkegccagdldgiimedpiccmgmieda';// hide "Google Wallet Service"
// 		});

// 		result.push({
// 			id: 'webstore',
// 			name: 'Chrome Web Store',
// 			appLaunchUrl: 'https://chrome.google.com/webstore',
// 			icon: 'https://www.google.com/images/icons/product/chrome_web_store-32.png',
// 			type: 'hosted_app'
// 		});

// 		// order apps
// 		var order = appsOrder || JSON.parse(localStorage.getItem('apps.order')) || [];

// 		result.sort(function (a, b) {
// 			var diff = order.indexOf(a.id) - order.indexOf(b.id);
// 			if (diff)
// 				return diff;
// 			else if (a.name < b.name)
// 				return -1;
// 			else if (a.name > b.name)
// 				return 1;
// 			else
// 				return 0;
// 		});

// 		appsOrder = [];
// 		for (var i = 0; i < result.length; i++)
// 			appsOrder.push(result[i].id);

// 		callback(result);
// 	});
// }

// get recently closed tabs
// function getClosed(callback) {
// 	var maxResults = getConfig('number_closed');
// 	chrome.sessions.getRecentlyClosed({ maxResults: maxResults }, function(sessions) {
// 		var nodes = [];
// 		for (var i = 0; i < sessions.length && i < maxResults; i++) {
// 			(function(session) {
// 				if (session.window && session.window.tabs.length == 1)
// 					session.tab = session.window.tabs[0];

// 				nodes.push({
// 					title: session.tab ? session.tab.title : session.window.tabs.length + ' Tabs',
// 					url: session.tab ? session.tab.url : null,
// 					className: session.window ? 'window' : null,
// 					action: function() {
// 						chrome.sessions.restore(session.window ? session.window.sessionId : session.tab.sessionId, function(session) {
// 							refreshClosed();
// 						});
// 						return false;
// 					}
// 				});
// 			})(sessions[i]);
// 		}
// 		callback(nodes);
// 	});
// }

// function getDevices(callback) {
// 	chrome.sessions.getDevices({ maxResults: getConfig('number_closed') }, function(devices) {
// 		var nodes = [];
// 		for (var i = 0; i < devices.length; i++) {
// 			(function(device) {
// 				var children = [];
// 				for (var j = 0; j < device.sessions.length; j++) {
// 					var session = device.sessions[j];
// 					var tabs = session.window ? session.window.tabs : [session.tab];
// 					for (var k = 0; k < tabs.length; k++) {
// 						children.push({
// 							title: tabs[k].title,
// 							url: tabs[k].url
// 						});
// 					}
// 				}
// 				nodes.push({
// 					id: 'device.' + device.deviceName,
// 					title: device.deviceName,
// 					children: children
// 				});
// 			})(devices[i]);
// 		}
// 		callback(nodes);
// 	});
// }

// refresh recently closed tab lists
// function refreshClosed() {
// 	var targets = [];
// 	var folders = document.getElementsByClassName('closed');
// 	for (var i = 0; i < folders.length; i++) {
// 		var a = folders[i];
// 		if (a.nextSibling) {
// 			a.parentNode.removeChild(a.nextSibling);
// 			targets.push(a.parentNode);
// 		}
// 	}
// 	if (folders.length === 0 && coords['closed']) {
// 		var target = document.getElementsByClassName('column')[coords['closed'].x];
// 		target.removeChild(target.firstChild);
// 		targets.push(target);
// 	}

// 	getChildrenFunction({id: 'closed'})(function(result) {
// 		for (var i = 0; i < targets.length; i++)
// 			renderAll(result, targets[i]);
// 	});
// }

// gets weather info from yahoo weather
// function getWeather(callback) {
// 	// check cache (30 minute expiry)
// 	var cached = JSON.parse(localStorage.getItem('weather.cache'));
// 	if (cached && new Date() - new Date(cached.date) < 1000 * 60 * 30) {
// 		callback(cached.data);
// 		return;
// 	}
// 	var onerror = function(event) {
// 		console.log(event);
// 		var targets = document.getElementsByClassName('weather');
// 		for (var i = 0; i < targets.length; i++){
// 			targets[i].childNodes[1].nodeValue = 'Error loading weather';
// 			targets[i].classList.add('error');
// 		}
// 	};
// 	var locId = getConfig('weather_location_id');
// 	if (!locId) {
// 		var loc = getConfig('weather_location');
// 		if (!loc) {
// 			// no location
// 			callback([{ id: 'weather', title: 'Location unknown', icon: 'http://l.yimg.com/a/i/us/we/52/3200.gif', action: function() {
// 				location.hash = '#options';
// 				document.getElementById('options_weather_location').focus();
// 				return false;
// 			} }]);
// 			return;
// 		}
// 	}
// 	// show cached (2 hours) or loading...
// 	if (cached && new Date() - new Date(cached.date) < 1000 * 60 * 120) 
// 	{
// 		callback(cached.data);
// 	} 
// 	else 
// 	{
// 		callback([{ id: 'weather', title: 'Loading weather...', children: true }]);
// 	}

// 	if (locId) {
// 		getForecast(locId, onerror);
// 	} else {
// 		getLocationId(loc, function(locId) {
// 			getForecast(locId, onerror);
// 		}, onerror);
// 	}
// }

// function getForecast(locId, onerror) {
// 	var query = 'select * from weather.forecast where woeid="' + locId + '" and u="' + getConfig('weather_units') + '" limit 1';
// 	var url = 'http://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent(query);
// 	var request = new XMLHttpRequest();
// 	request.onload = function(event) {
// 		try {
// 			var nodes = [];
// 			var response = JSON.parse(request.response).query.results.channel;

// 			// current conditions
// 			var current = response.item.condition;
// 			var parentnode = {
// 				id: 'weather',
// 				title: current.temp + '°' + (getConfig('weather_units') == 'c' ? 'C' : 'F') + ' ' + current.text,
// 				tooltip: response.item.title,
// 				icon: 'http://l.yimg.com/a/i/us/we/52/' + current.code + '.gif'
// 			};

// 			// forecast
// 			var forecast = response.item.forecast;
// 			for (var i = 0; i < forecast.length && i < 5; i++) {
// 				nodes.push({
// 					title: forecast[i].day + ' ' +
// 						forecast[i].high + '°, ' +
// 						forecast[i].low + '° ' +
// 						forecast[i].text,
// 					icon: 'http://l.yimg.com/a/i/us/we/52/' + forecast[i].code + '.gif'
// 				});
// 			}
// 			parentnode.children = nodes;
// 			refreshWeather([parentnode], url);
// 		} catch (e) {
// 			onerror(e);
// 		}
// 	};
// 	request.onerror = onerror;
// 	request.open('GET', url + '&' + Date.now(), true);
// 	request.send();
// }

// function getLocationId(text, callback, onerror) {
// 	var query = 'select woeid from geo.places where text="' + text + '" and focus="" limit 1';
// 	var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent(query);
// 	var request = new XMLHttpRequest();
// 	request.onload = function() {
// 		var response = JSON.parse(request.response);
// 		if (response && response.query && response.query.results && response.query.results.place && response.query.results.place.woeid) {
// 			var woeid = response.query.results.place.woeid;
// 			setConfig('weather_location_id', woeid);
// 			callback(woeid);
// 		} else {
// 			onerror(response);
// 		}
// 	};
// 	request.onerror = onerror;
// 	request.open('GET', url + '&' + Date.now(), true);
// 	request.send();
// }

// refreshes weather items
// function refreshWeather(data, url) {
// 	// cache data
// 	if (data)
// 		localStorage.setItem('weather.cache', JSON.stringify({
// 			data: data,
// 			url: url,
// 			date: new Date()
// 		}));
// 	else
// 		localStorage.removeItem('weather.cache');
// 	// render
// 	var targets = document.getElementsByClassName('weather');
// 	for (var i = 0; i < targets.length; i++) {
// 		var target = targets[i].parentNode;
// 		getSubTree('weather', function(result) {
// 			var li = render(result[0], target.parentNode, 'weather');
// 			target.parentNode.replaceChild(li, target);
// 		});
// 	}
// }

/*

titlefont_color: '#000000',
titlebackground_color: '#b8b8b8',
*/

// options : default values
var config = {
	font: 'Helvetica',
	font_size: 16,
	theme: 'Default',
	titlefont_color: '#000000',
	font_color: '#000000',
	titlebackground_color: '#b8b8b8',
	background_color: '#ffffff',
	highlight_color: '#ffffff',
	highlight_font_color: '#7f7f7f',
	shadow_color: '#949494',
	// background_image_file: '',
	// background_image: '',
	// background_align: 'left top',
	// background_repeat: 'repeat',
	// background_size: 'auto',
	shadow_blur: 1.1,
	highlight_round: 1,
	fade: 1,
	// itemsperrow: 5,
	// spacing: 1,
	width: 825,
	// h_pos: 1,
	// v_margin: 1,
	// slide: 1,
	// hide_options: 0,
	// lock: 0,
	// weather_location: '',
	// weather_location_id: '',
	// weather_units: 'c',
	show_top: 1,
	// show_apps: 1,
	// show_recent: 1,
	// show_weather: 1,
	// show_closed: 1,
	// show_devices: 1,
	// show_root: 0,
	newtab: 0,
	// auto_close: 0,
	// auto_scale: 1,
	// css: '',
	number_top: 10,
	// number_closed: 10,
	// number_recent: 10,
	folderOrder: '',
	topsitesblacklist: '',
};

// color theme values
var themes = {
	Default: {
		// titlefont_color: '#3f3f3f',
		// font_color: '#7f7f7f',
		// titlebackground_color: '#dddddd',
		// background_color: '#f6f6f6',
		// highlight_color: '#ffffff',
		// highlight_font_color: '#000000',
		// shadow_color: '#aaaaaa'
	},
	Classic: {
		titlefont_color: '#3f3f3f',
		font_color: '#000000',
		titlebackground_color: '#bfbfbf',
		background_color: '#ffffff',
		highlight_color: '#3399ff',
		highlight_font_color: '#ffffff',
		shadow_color: '#97cbff'
	},
	Dusk: {
		titlefont_color: '#79759a',
		font_color: '#c8b9be',
		titlebackground_color: '#3d3c4e',
		background_color: '#56546b',
		highlight_color: '#494d5a',
		highlight_font_color: '#ffd275',
		shadow_color: '#000000'
	},
	Elegant: {
		titlefont_color: '#3f3f3f',
		font_color: '#888888',
		titlebackground_color: '#dddddd',
		background_color: '#f6f6f6',
		highlight_color: '#ffffff',
		highlight_font_color: '#000000',
		shadow_color: '#aaaaaa'
	},
	Frosty: {
		titlefont_color: '#e3edf3',
		font_color: '#3e5e82',
		titlebackground_color: '#0080c0',
		background_color: '#e4eef3',
		highlight_color: '#0080c0',
		highlight_font_color: '#ffffff',
		shadow_color: '#8080ff',
	},
	Hacker: {
		titlefont_color: '#00ff00',
		font_color: '#00ff00',
		titlebackground_color: '#000000',
		background_color: '#000000',
		highlight_color: '#00ff00',
		highlight_font_color: '#000000',
		shadow_color: '#ff0000'
	},
	Melon: {
		titlefont_color: '#f8ffe1',
		font_color: '#594526',
		titlebackground_color: '#ff8000',
		background_color: '#f8ffe1',
		highlight_color: '#ff8000',
		highlight_font_color: '#ffff80',
		shadow_color: '#ff80c0'
	},
	Midnight: {
		titlefont_color: '#bddeff',
		font_color: '#bfdfff',
		titlebackground_color: '#0a0f18',
		background_color: '#101827',
		highlight_color: '#000000',
		highlight_font_color: '#80ecff',
		shadow_color: '#0080ff'
	},
	Slate: {
		titlefont_color: '#555555',
		font_color: '#555555',
		titlebackground_color: '#b7babf',
		background_color: '#b7babf',
		highlight_color: '#aaaaaa',
		highlight_font_color: '#000000',
		shadow_color: '#2a2a2a'
	},
	Trees: {
		titlefont_color: '#1f9600',
		font_color: '#cdd088',
		titlebackground_color: '#25642c',
		background_color: '#566157',
		highlight_color: '#4d674b',
		highlight_font_color: '#ffff80',
		shadow_color: '#183010'
	},
	Valentine: {
		titlefont_color: '#895fc2',
		font_color: '#895fc2',
		titlebackground_color: '#ffb7f0',
		background_color: '#eae1ff',
		highlight_color: '#ffb7f0',
		highlight_font_color: '#f00000',
		shadow_color: '#ffffff'
	},
	Warm: {
		titlefont_color: '#ffeedc',
		font_color: '#824100',
		titlebackground_color: '#824100',
		background_color: '#ffeedd',
		highlight_color: '#fffae8',
		highlight_font_color: '#800000',
		shadow_color: '#d98764'
	}
	,
	Monokai: 
	{
		titlefont_color: '#a2d92b',
		font_color: '#6be5f2',
		titlebackground_color: '#262620',
		background_color: '#262621',
		highlight_color: '#f22987',
		highlight_font_color: '#262621',
		shadow_color: '#a37ef2'
	}
	,
	Dracula: 
	{
		titlefont_color: '#6272a4',
		font_color: '#6272a4',
		titlebackground_color: '#44475a',
		background_color: '#282a36',
		highlight_color: '#44475a',
		highlight_font_color: '#f8f8f2',
		shadow_color: '#000000'
	}
};
var theme = {};

// get config value or default
function getConfig(key)
{
	// console.log('getConfig('+key+')');

	var value =  localStorage.getItem('options.' + key);
	if (value != null)
	{
		return typeof config[key] === 'number' ? Number(value) : value;
	}
	else
	{
		return (theme.hasOwnProperty(key) ? theme[key] : config[key]);
	}
}

// set config value
function setConfig(key, value) 
{
	// console.log('setConfig(' + key + ',' + value + ')');

	if (value != null)
	{
		localStorage.setItem('options.' + key, typeof config[key] === 'number' ? Number(value) : value);
	}
	else 
	{
		localStorage.removeItem('options.' + key);
		value = (theme.hasOwnProperty(key) ? theme[key] : config[key]);
	}
	// special case settings
	if (key == 'lock' || key == 'newtab' || key == 'show_root' || key.substring(0,6) == 'number')
	{
		loadColumns();
	}
	else if (key == 'theme') 
	{
		theme = themes[value];

		for (var i in theme)
		{
			// console.log('i: ' + i);
			// console.log('theme[i]: '+ theme[i]);
			setConfig(i,theme[i]);
		}

		for (var i in config) 
		{
			if (i != key) 
			{
				onChange(i);
				showConfig(i);
			}
		}
	} 
	// else if (key.substring(0, 7) == 'weather') 
	// {
	// 	if (key == 'weather_location')
	// 		setConfig('weather_location_id', null);
	// 	else
	// 		refreshWeather();
	// } 
	// else if (key.substring(0,4) == 'show') 
	// {
	// 	var id = key.substring(5);
	// 	if (!value) {
	// 		if (coords[id])
	// 			removeRow(coords[id].x, coords[id].y);
	// 		saveColumns();
	// 	} else {
	// 		saveColumns();
	// 	}
	// }
	onChange(key, value);
	return value;
}

// map config keys to styles
var styles = {};

function getStyle(key, value) 
{
	switch(key) {
		case 'font':
			return '#main a { font-family: "' + value + '"; } .gu-mirror .contents {font-family: "' + value + '"; }';
		case 'font_size':
			return '#main a { font-size: ' + (value / 10) + 'em; } .gu-mirror .contents { font-size: ' + (value / 10) + 'em; }';
		case 'titlefont_color':
			return '.title { color: ' + value + '; }';
		case 'font_color':
			return '#main a { color: ' + value + '; } .gu-mirror .contents { color: ' + value + '; }';
		case 'titlebackground_color':
			return '.topbar { background-color: ' + value + '; }';
		case 'itemsperrow':
			return '.contents { grid-template-columns: repeat( ' + value + ', 1fr );}';
		case 'background_color':
			return '.gu-mirror {background-color: ' + value + '; } body { background-color: ' + value + '; }';
		case 'background_image':
			return 'body { background-image: url(' + value + '); }';
		case 'background_image_file':
			return 'body { background-image: url(' + value + '); }';
		case 'background_align':
			return 'body { background-position: ' + value + '; }';
		case 'background_repeat':
			return 'body { background-repeat: ' + value + '; }';
		case 'background_size':
			return 'body { background-size: ' + value + '; }';
		case 'highlight_font_color':
			return '#main a:hover { color: ' + value + '; }';
		case 'highlight_color':
			return '#main a:hover { background-color: ' + value + '; }';
		case 'shadow_color':
			return '#main a:hover { box-shadow: 0px ' + scale(getConfig('shadow_blur'), 7, 100)/2 + 'px ' + scale(getConfig('shadow_blur'), 7, 100) + 'px ' + value + '; }';
		case 'shadow_blur':
			return '#main a:hover { box-shadow: 0px ' + (scale(value, 7, 100))/2 + 'px ' + scale(value, 7, 100) + 'px ' + getConfig('shadow_color') + '; }';
		case 'highlight_round':
			return '#main a { border-radius: ' + scale(value, .2, 1.5) + 'em; }';
		case 'fade':
			return '#main a { -webkit-transition-duration: ' + scale(value, .2, 1) + 's; }';
		case 'slide':
			return '.wrap { -webkit-transition-duration: ' + scale(value, .2, 1) + 's; }';
		case 'spacing':
			return '#main a { line-height: ' + scale(value, 2, 5.6, .8) + '; ' +
							'padding-left: ' + scale(value, .8, 2, .4) + 'em; ' +
							'padding-right: ' + scale(value, .8, 2, .4) + 'em; }';
		case 'width':
			return '#main {width: ' + value + 'px ; }'
			// return '#main { width: ' + (getConfig('auto_scale') ?
			// 	scale(value, 80, 100, 20) + '%' :
			// 	scale(value, 1000, 3000, 400) + 'px') + '; }';
		case 'h_pos':
			var margin = 100 - scale(getConfig('width'), 80, 100, 20);
			return '#main { left: ' + scale(value, 0, margin/2, -margin/2) + '%; }';
		case 'v_margin':
			return '#main { margin-top: ' + (getConfig('auto_scale') ?
				scale(value, 5, 20) + '%' :
				scale(value, 80, 600) + 'px') + '; }';
		case 'hide_options':
			return '#options_button { opacity: 0; }';
		case 'css':
			return value;
		case 'auto_scale':
			return value ? null : '#main { margin-top: 80px; width: 1000px; }';
		default:
			return null;
	}
}

// scales input value from [0,1,2] to [min,mid,max]
function scale(value, mid, max, min) {
	min = min || 0;
	return value > 1 ?
		mid + (value - 1) * (max - mid) :
		min + value * (mid - min);
}

// gets rgb representation of hex color
function hexToRgb(hex) {
	hex = /[a-f\d]{6}/i.exec(hex);
	var bigint = parseInt(hex, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;
	return r + "," + g + "," + b;
}

// apply config value change
function onChange(key, value) 
{

	console.log('onChange(' + key +','+ value + ')');

	if (value == null)
	{
		value = getConfig(key);
	}

	// console.log('value: ' + value);

	// if (value != config[key]) 
	// {
		var css = getStyle(key, value);
		// console.log('css: ' + css);
		if (css) 
		{
			var style;
			if (styles.hasOwnProperty(key))
			{
				style = styles[key];
			}
			else 
			{
				style = document.createElement('style');
				styles[key] = style;
			}
			document.head.appendChild(style);

			// add style rules
			style.innerText = css;
		}

		// if (key == 'itemsperrow')
		// {
		// 	if (value == 8)
		// 	{
		// 		// document.getElementById('wide8').href = 'wide8.css';
		// 		document.getElementById('wide7').href = '';
		// 		document.getElementById('wide6').href = '';
		// 		document.getElementById('wide5').href = '';
		// 		document.getElementById('wide4').href = '';
		// 	}
		// 	else if (value == 7)
		// 	{
		// 		document.getElementById('wide8').href = '';
		// 		// document.getElementById('wide7').href = 'wide7.css';
		// 		document.getElementById('wide6').href = '';
		// 		document.getElementById('wide5').href = '';
		// 		document.getElementById('wide4').href = '';
		// 	}
		// 	else if (value == 6)
		// 	{
		// 		document.getElementById('wide8').href = '';
		// 		document.getElementById('wide7').href = '';
		// 		// document.getElementById('wide6').href = 'wide6.css';
		// 		document.getElementById('wide5').href = '';
		// 		document.getElementById('wide4').href = '';
		// 	}
		// 	else if (value == 5)
		// 	{
		// 		document.getElementById('wide8').href = '';
		// 		document.getElementById('wide7').href = '';
		// 		document.getElementById('wide6').href = '';
		// 		// document.getElementById('wide5').href = 'wide5.css';
		// 		document.getElementById('wide4').href = '';
		// 	}
		// 	else if (value == 4)
		// 	{
		// 		document.getElementById('wide8').href = '';
		// 		document.getElementById('wide7').href = '';
		// 		document.getElementById('wide6').href = '';
		// 		document.getElementById('wide5').href = '';
		// 		// document.getElementById('wide4').href = 'wide4.css';
		// 	}
		// }
		
	// } 
	// else if (styles.hasOwnProperty(key)) 
	// {
	// 	// remove rules
	// 	styles[key].parentNode.removeChild(styles[key]);
	// 	delete styles[key];
	// }

	// refresh dependent values
	if (key == 'width')
	{
		onChange('h_pos');
	}
	else if (key == 'shadow_blur')
	{
		onChange('shadow_color');
	}
	else if (key == 'auto_scale') 
	{
		onChange('width');
		onChange('v_margin');
	}

	// update options panel
	if (!settingsInitialized)
	{
		return;
	}

	// show/hide default button
	var input = document.getElementById('options_' + key);
	if (input) 
	{
		var isDefault = value == (theme.hasOwnProperty(key) ? theme[key] : config[key]);
		input.reset.style.visibility = (isDefault ? 'hidden' : null);
		if (input.swatch)
		{
			input.swatch.value = value;
		}
	}
}

// loads config settings
function loadSettings() 
{

	// console.log('loadSettings()');

	// load theme
	theme = themes[getConfig('theme')] || {};
	// load settings
	for (var key in config)
	{
		if (key === 'background_image_file')
		{
			setTimeout(function() { onChange('background_image_file'); }, 0);
		}
		else
		{
			// console.log('loadSettings-->' + key);      
			onChange(key);
		}
	}
}

// apply config values to input controls
function showConfig(key) 
{
	var input = document.getElementById('options_' + key);
	if (!input || input.type === 'file')
	{
		return;
	}

	input[input.type === 'checkbox' ? 'checked' : 'value'] = getConfig(key);
}

// initialize config settings
function initConfig(key) 
{


	var input = document.getElementById('options_' + key);
	if (!input)
	{
		return;
	}

	// console.log('initConfig(' + key + ')');
	// console.log('initConfig: ' + input.type );


	if (input.type == 'color') 
	{
		input.type = 'text';
		input.className = 'color';
		var swatch = document.createElement('input');
		swatch.type = 'color';
		swatch.value = input.value;
		swatch.oninput = function(event) 
		{
			input.value = this.value;
			return input.onchange(event);
		};
		input.swatch = swatch;
		input.parentNode.appendChild(swatch);
	}
	
	input.onchange = function(event) 
	{
		if (input.type == 'file') 
		{
			// load file
			if (event.target.files.length == 1) 
			{
				var file = event.target.files[0];
				if (file.size > 2097152) 
				{
					input.value = null;
					alert('Image must be less than 2 MB.');
					return false;
				}
				var reader = new FileReader();
				reader.onload = function(f) 
				{
					if (f.target.result)
					{
						setConfig(key, f.target.result);
					}
				};
				reader.readAsDataURL(file);
			}
		} 
		else
		{
			setConfig(key, input.type == 'checkbox' ? Number(input.checked) : input.value);
		}
	};


	input.ondragenter = function (e) 
	{ 
		// this.className = 'nicenice lvl-over'; 
		return false; 
	};
	input.ondragleave = function () { 
		// this.className = 'nicenice'; 
		return false; 
	};
	input.ondrop = function (e) 
	{
		// e.preventDefault();
		// console.log(e);
		// setConfig(key, input.value);
		setTimeout(() => {setConfig(key, input.value);}, 250);
		
	};
	input.ondragover = function (e) 
	{ 
		e.preventDefault() 
	  
	}

	// input.onpaste = function(event)
	// {
	// 	if (input.type == 'text')
	// 	{
	// 		setConfig(key,input.value);
	// 	}
	// };

	// input.onmouseup = function(event)
	// {
	// 	if (input.type == 'text')
	// 	{
	// 		setConfig(key,input.value);
	// 	}
	// };

	// input.ondrop = function(event)
	// {
	// 	if (input.type == 'text')
	// 	{
	// 		setConfig(key,input.value);
	// 	}
	// };

	
	var reset = document.createElement('a');
	reset.href = '#';
	reset.className = 'revert';
	reset.title = 'Reset to default';
	reset.onclick = function() 
	{
		setConfig(key, null);
		showConfig(key);
		return false;
	};

	input.reset = reset;
	input.parentNode.appendChild(reset);

	showConfig(key);
}

var settingsInitialized = false;

// initialize options panel
function initSettings() 
{
	// console.log('initSettings()');

	if (settingsInitialized)
	{
		return;
	}

	// options menu
	document.getElementById('options_button').onclick = function() 
	{
		for (var key in config)
		{
			// console.log('config::')
			// console.log(key);

			showConfig(key);
		}

		return true;
	};

	// options submenu navigation
	var options = document.getElementById('options');
	var nav = document.getElementById('options_nav');
	var index = 0;

	for (var i=0; i<nav.children.length; i++) 
	{
		var a = nav.children[i].firstChild;
		a.onclick = function(e) 
		{
			// clear current style
			nav.children[index].firstChild.classList.remove('current');
			options.getElementsByClassName('section')[index].classList.remove('current');
			// apply new current style
			index = Array.prototype.indexOf.call(nav.children, this.parentNode);
			nav.children[index].firstChild.classList.add('current');
			options.getElementsByClassName('section')[index].classList.add('current');

			// show custom css on advanced tab
			/*
			if (index === nav.children.length-1) 
			{
				var allcss = document.getElementById('all_css');
				allcss.value = '';
				for (var key in config) {
					var css = (getStyle(key, getConfig(key)));
					if (css && css.length < 1000 && key != 'css')
						allcss.value +=  css + '\n';
				}
			}
			*/

			// import/export
			/*
			if (index === nav.children.length-2) 
			{
				var exports = document.getElementById('options_export');
				var imports = document.getElementById('options_import');
				var replacer = function(key, value) {
					if (key == 'options.background_image_file' || key == 'weather.cache') {
						return undefined;
					}
					return value;
				};
				exports.value = JSON.stringify(localStorage, replacer);
				imports.value = '';
				imports.placeholder = 'Paste exported settings here';
				imports.onchange = function() {
					try {
						var imported = JSON.parse(imports.value);
						for(var key in imported) {
							localStorage.setItem(key, imported[key]);
						}
						imports.value = '';
						imports.placeholder = 'Import successful!';
						exports.value = JSON.stringify(localStorage, replacer);
						loadSettings();
						loadColumns();
					} catch (e) {
						imports.value = '';
						imports.placeholder = 'Import error! Please check if your settings are valid JSON.';
					}
				};
			}
			*/
			return false;
		};
	}

	// add options to hide bookmark folders
	chrome.bookmarks.getTree(function(result) 
	{
		var placeholder = document.getElementById('options_show_bookmarks');
		var nodes = result[0].children;
		for (var i = 0; i < nodes.length; i++) 
		{
			var key = 'show_' + nodes[i].id;
			config[key] = 1;

			var span = document.createElement('span');
			span.innerText = nodes[i].title;

			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'options_' + key;

			var label = document.createElement('label');
			label.appendChild(span);
			label.appendChild(input);
			placeholder.appendChild(label);
		}

		// replace text input with system font list
		if (chrome.fontSettings) {
			var input = document.getElementById('options_font');
			var select = document.createElement('select');
			input.parentNode.replaceChild(select, input);
			select.id = input.id;
		}

		// all input elements for options should be in place
		settingsInitialized = true;

		// show settings
		for (var key in config)
		{
			initConfig(key);
		}

		loadSettings();

		// load themes
		var select = document.getElementById('options_theme');
		if (select.childNodes.length === 0) {
			for (var i in themes) {
				var option = document.createElement('option');
				option.innerText = i;
				if (i == getConfig('theme'))
					option.selected = 'selected';
				select.appendChild(option);
			}
		}

		// load font list
		if (chrome.fontSettings) 
		{
			chrome.fontSettings.getFontList(function(fonts)  {
				var select = document.getElementById('options_font');
				if (select.childNodes.length > 0)
					return;

				fonts.unshift({ fontId: 'Sans-serif' });
				for (var i = 0; i < fonts.length; i++) {
					var font = fonts[i].fontId;
					var option = document.createElement('option');
					option.innerText = font;
					if (font == getConfig('font'))
						option.selected = 'selected';
					select.appendChild(option);
				}
			});
		}
	});
}


function clearLocalStorage()
{
	localStorage.clear();
}
// clearLocalStorage();

// initialize page

initSettings();
loadSettings();
loadNewTabPage();

// loadColumns();
// loadBookmarks();
// loadTopSites();


// var starttime;

function loadNewTabPage()
{
	// var bookmarkPromise;
	// bookmarkPromise = getBookmarks();
	// bookmarkPromise.then(bookmarkLoop, onRejected);
	// bookmarkPromise.then(loadTopSites);

	// bookmarksLoaded = 0;
	// topsitesLoaded = 0;

	// var d = new Date;
	// starttime = d.getTime();

	getBookmarks();
	loadTopSites();
	reorderFolders();
}



var bookmarksLoaded;
function getBookmarks() 
{
	bookmarksLoaded = 0;
	// var allBookmarks = chrome.bookmarks.getTree();
	// allBookmarks.then(bookmarkLoop, onRejected);
	// allBookmarks.then(function(){bookmarksLoaded = 1;})

	// chrome.bookmarks.getTree
	// (
	// 	function()
	// 	{
	// 		bookmarkLoop();
	// 		bookmarksLoaded = 1;
	// 	}
	// )

	chrome.bookmarks.getTree(bookmarkLoop);
	chrome.bookmarks.getTree(function(){bookmarksLoaded = 1;});

	// allBookmarks.then(
	// 	function(){
	// 		console.log('allBookmarks endtime');
	// 		var d = new Date;
	// 		console.log(d.getTime() - starttime);
	// 	}
	// )

	// return allBookmarks;
	// allBookmarks.then(reorderTopSites);
}

var topsitesLoaded;
// var topsitesblacklistArray;
function loadTopSites()
{
	// console.log(getConfig('show_top'));
	// console.log(getConfig('number_top'));
	
	topsitesLoaded = 0;

	if (getConfig('show_top') == 1)
	{

		// topsitesblacklistArray = getConfig('topsitesblacklist').split(',');

		// var topsites = browser.topSites.get();
		// topsites.then(topsitesLoop, onRejected);
		// topsites.then(function(){topsitesLoaded = 1;})
		// topsites.then(reorderTopSites);

		// chrome.topSites.get
		// (
		// 	function()
		// 	{
		// 		topsitesLoop();
		// 		topsitesLoaded = 1;
		// 		reorderTopSites();
		// 	}
		// )

		chrome.topSites.get(topsitesLoop);
		chrome.topSites.get(function(){topsitesLoaded = 1;});


	}
	else
	{
		topsitesLoaded = 1;
	}

}

function reorderFolders()
{

	if (bookmarksLoaded + topsitesLoaded < 2)
	{
		setTimeout(reorderFolders,100);
		// console.log('try again');
		return;
	}

	var main  = document.getElementById('main');

	var folderOrder = getConfig('folderOrder');
	var folderOrderArray = folderOrder.split(","); 

	if (folderOrder != '')
	{
		for (var i = 0; i < folderOrderArray.length;i++)
		{
			var thisEl = document.getElementById(folderOrderArray[i]);		

			if (thisEl != null)
			{
				main.insertBefore(thisEl,main.children[i]);
			}

		}
	}

}





// function TopSites(num)
function topsitesLoop(topsiteItems)
{

	// console.log(topsiteItems);

	var TS_Folder = createFolder(true,{title:'TopSites',id:'topsites'},'');
	document.getElementById('main').appendChild(TS_Folder);
	TS_Folder.className = 'specialfolder';
	// TS_Folder.style.order="1" 

	var divs = TS_Folder.getElementsByTagName('div');
	var contents;
	for (var i = 0; i < divs.length; i += 1) 
	{
	
		if (divs[i].className == 'contents')
		{
			contents = divs[i];
			break;
		}
	}

	// var contents = TS_Folder.getElementsByClassName('contents');
	// console.log(contents);

	// console.log(topsitesblacklistArray);

	var num = getConfig('number_top');
	var cnt = 0;
	// var inBlackList = false;
	var topsitesblacklist = getConfig('topsitesblacklist');
	for (var i = 0; i < topsiteItems.length; i++) 
	{

		if (topsiteItems[i].url.substring(0,4) == 'file'
			|| topsiteItems[i].title == 'New Tab'
			)
		{
			continue;
		}

		// inBlackList = false;
		// for (var j = 0 ;j < topsitesblacklistArray.length;j++)
		// {
		// 	console.log(topsitesblacklistArray[j]);
		// 	console.log(topsiteItems[i].url);
		// 	console.log(topsitesblacklistArray[j].includes(topsiteItems[i].url));
		// 	if (topsitesblacklistArray[j].includes(topsiteItems[i].url))
		// 	{
		// 		inBlackList = true;
		// 	}
		// }

		// if (inBlackList)
		// {
		// 	continue;
		// }

		if (topsitesblacklist.includes(topsiteItems[i].url))
		{
			continue;
		}

		// console.log(topsiteItems[i].title + "::" + topsiteItems[i].url);

		if (cnt < num)
		{
			contents.appendChild(createLink(topsiteItems[i]));
		}
		cnt++;
	}

}


// function createFolder(isRoot, id ,strTitle, parentId)
// function createFolder(isRoot ,strTitle, parentFolder)
function createFolder(isRoot ,bookmarkItem, parentId)
{
	var folder;
	folder = document.createElement('div');
	folder.className = 'folder';
	folder.id = bookmarkItem.id;
	// folder.id = strTitle;
	// folder.id = id;//strTitle
	// folder.setAttribute("parentFolder",parentFolder);

	var topbar;
	topbar = document.createElement('div');
	topbar.className = 'topbar';

	var backbutton;
	backbutton = document.createElement('button');
	backbutton.className = 'backbutton';
	backbutton.id = '/'+parentId;
	// backbutton.id = '/'+parentFolder;
	// backbutton.id = '<-'+parentFolder;
	// backbutton.innerText = '<-';
	backbutton.onclick = onClickLink();
	// backbutton.onclick = onBack();

	var bbImg =document.createElement('img');
	bbImg.src = '/resources/backArrow.png';
	backbutton.appendChild(bbImg);

	topbar.appendChild(backbutton);


	//don't show back button if at root
	if (isRoot)
	{
		backbutton.style.display = "none";
	}

	if (!isRoot)
	{
		folder.style.display = "none";
	}
	
	var title;
	title = document.createElement('div');
	title.className = 'title';
	title.innerText = bookmarkItem.title;
	// title.innerText = strTitle;
	topbar.appendChild(title);

	var contents;
	contents = document.createElement('div');
	contents.className = 'contents';

	folder.appendChild(topbar);
	folder.appendChild(contents);	


	return folder;
}


function onClickLink() 
{
	return function() 
	{
		// console.log(this.className);
		// console.log(this.href);

		var thisFolder = this.id.replace('/','');
		// console.log("show: " + thisFolder);

		var found = false;
		var div = document.getElementById('main');
		var divs = div.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i += 1) 
		{
		
			if (divs[i].className != 'folder')
			{
				continue;
			}

			// console.log(divs[i].className + " :: "+ divs[i].id );

			// if (divs[i].id == thisFolder && !found)
			if (divs[i].id == thisFolder )
			{
				// console.log(divs[i].id + " : "+ divs[i].classList);
				divs[i].style.display = 'inline-block';
				// found = true;
			}
			else
			{
				divs[i].style.display = 'none';
			}
		}

		////debugging
		// console.log('thisFolder: ' + thisFolder);
		// console.log(backbuttons);
		// console.log('backbuttons[0].id: ' + backbuttons[0].id);

		var SFs = document.getElementsByClassName('specialfolder');
		var Fs = document.getElementsByClassName('folder');

		//if at RootFolder
		if (IsRootFolder(thisFolder))
		{
			for (var i =0 ; i < SFs.length;i++)
			{
				SFs[i].style.display = 'block';
			}
			
			for (var i =0 ; i < Fs.length;i++)
			{
				if (IsRootFolder(Fs[i].id))
				{
					Fs[i].style.display = 'block';
				}
			}
		}
		else
		{
			for (var i =0 ; i < SFs.length;i++)
			{
				SFs[i].style.display = 'none';
			}
		}




	};
}

function IsRootFolder(id)
{
	var result = false;
	if (document.getElementById(id).getElementsByTagName('button')[0].id == '/')
	{
		result = true;
	}

	return result;
}

function createLink(bookmarkItem)
{
	// console.log(bookmarkItem.title + "::" + bookmarkItem.url);
	var url, url0, imgsrc, isFolder;
	var id;

	if (bookmarkItem.url)
	{
		isFolder = false;
		url = bookmarkItem.url;
		url0 = url.replace("https://","").replace("http://","");
		url0 = url0.substring(0,url0.indexOf("/"));

		// if (url0.includes('imgur'))
		// {
		// 	url0 = "https://imgur.com/";
		// }

		imgsrc = 'https://icons.better-idea.org/icon?url=' + url0 + '&size=80..120..200';
		id = bookmarkItem.title;
		// id = bookmarkItem.id;
	}
	else
	{
		isFolder = true;
		url = '#';
		imgsrc = '/resources/folderIcon.png';
		// id = '/' + bookmarkItem.title; 
		id = '/' + bookmarkItem.id; 
	}


	var link;
	link = document.createElement('a');
	link.href = url;
	link.id = id;


	// link.getAttribute()
	if (isFolder)
	{
		link.onclick = onClickLink();
		// link.style.
	}
	else
	{
		
		var newtab = getConfig('newtab');
		// console.log(newtab);

		if (newtab==1)
		{
			link.target = '_blank';
		}
		else if (newtab == 2)
		{
			link.onclick = function(event) 
			{
				browser.tabs.getCurrent(function(tab) 
				{
					browser.tabs.create({url: url, active: false, openerTabId: tab.id});
				});
				return false;
			};
		}


	}
	

	var image;
	image = document.createElement('img');
	//image.src = 'https://icons.better-idea.org/icon?url=' + url0 + '&size=80..120..200';
	image.src = imgsrc;

	
	// var div;
	// div = document.createElement('div');
	// div.innerText = bookmarkItem.title;
	
	var title = document.createTextNode(bookmarkItem.title);

	link.appendChild(image);
	link.appendChild(title);

	return link;

	//https://icons.better-idea.org/icon?url=google.com&size=80..120..200
	//url1 = 'https://icons.better-idea.org/icon?url=' + subText + '&size=80..120..200';
}



// var folderCnt = 0;
// function bookmarklog(bookmarkItem,parentFolder)
function bookmarklog(bookmarkItem,parentId)
{

	// var ThisFolder = createFolder(false,bookmarkItem.title);


	// console.log("create folder");

	var ThisFolder;
	// if (folderCnt == 0)
	if (parentId == "")
	{
		// ThisFolder = createFolder(true,bookmarkItem.title,parentFolder);
		ThisFolder = createFolder(true,bookmarkItem,parentId);
		// console.log("createFolder(true,bookmarkItem.title,parentFolder);")
	}
	else
	{
		// ThisFolder = createFolder(false,bookmarkItem.title,parentFolder);
		ThisFolder = createFolder(false,bookmarkItem,parentId);
		// console.log("createFolder(false,bookmarkItem.title,parentFolder);")
	}
	document.getElementById('main').appendChild(ThisFolder);
	// folderCnt += 1;

	// console.log("new folder: " + ThisFolder.id);

	if (bookmarkItem.children.length == 0)
	{
		ThisFolder.style.display = "none";
	}

	var child;
	for (child of bookmarkItem.children)
	{
		// console.log(child.title);
		// console.log(child.url.substring(0,6));

		if (
			// child.url
			child.url  == 'data:'
			|| child.title  == 'Most Visited' 
			|| child.title  == 'Recent Tags'
			)
		{
			continue;
		}

		var contents = ThisFolder.getElementsByClassName('contents')[0];
		contents.appendChild(createLink(child));

		if (child.children)
		{
			// bookmarklog(child, bookmarkItem.title);
			bookmarklog(child, bookmarkItem.id);
		}

	}
}

//log bookmark in console
function bookmarkLoop(bookmarkItems) 
{

	var bookmarkItem;
	for (bookmarkItem of bookmarkItems[0].children) 
	{
		// console.log(bookmarkItem.title);

		// console.log('in: logTree::');
		var key = 'show_' + bookmarkItem.id;
		// console.log(key);
		// console.log(getConfig(key));

		if (getConfig(key) == 1)
		{
			// console.log(':: ' + key + ' :: ' + getConfig(key));

			bookmarklog(bookmarkItem,"");

		}

	}


	// 	// var topSites = TopSites();
	// 	// folder.appendChild(topSites);

}

//console log error
function onRejected(error) 
{
	console.log(`An error: ${error}`);
}
  








// fix scrollbar jump
window.onresize = function(event) {
	document.body.style.width = window.innerWidth + 'px';
};
window.onresize();

// load options panel
window.onhashchange = function(event) 
{
	if (location.hash === '#options')
	{
		initSettings();
	}
};
// window.onhashchange();

// // refresh recently closed
// if (chrome.sessions)
// {
// 	chrome.sessions.onChanged.addListener(refreshClosed);
// }



/*
dragula([document.getElementById('main')], 
{
	isContainer: function (el) 
	{
		// console.log('isContainer: ' + el);
	  return false; // only elements in drake.containers will be taken into account
	},
	moves: function (el, source, handle, sibling) 
	{
		// console.log('moves el: ' + el);
		// console.log('moves source: ' + source);
		// console.log('moves handle: ' + handle);
		// console.log('moves sibling: ' + sibling);
	  return true; // elements are always draggable by default
	},
	accepts: function (el, target, source, sibling) 
	{
		// console.log('accepts el: ' + el);
		// console.log('accepts target: ' + target);
		// console.log('accepts source: ' + source);
		// console.log('accepts sibling: ' + sibling);
	  return true; // elements can be dropped in any of the `containers` by default
	},
	invalid: function (el, handle) 
	{
		// console.log('invalid el: ' + el);
		// console.log('invalid handle: ' + handle);
	  return false; // don't prevent any drags from initiating by default
	},
	direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
	copy: false,                       // elements are moved by default, not copied
	copySortSource: false,             // elements in copy-source containers can be reordered
	revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
	removeOnSpill: false,              // spilling will `.remove` the element, if this is true
	mirrorContainer: document.body,    // set the element that gets mirror elements appended
	ignoreInputTextSelection: true     // allows users to select input text, see details below
  });
*/

//https://github.com/bevacqua/dragula
var drake;
function startDragula()
{

	drake = dragula([document.getElementById('main')], 
	{
		isContainer: function (el) 
		{
			// console.log('isContainer: ' + el);
		  return false; // only elements in drake.containers will be taken into account
		},
		moves: function (el, container, handle) 
		{
			// console.log('moves handle: ' + handle);
			// console.log('moves handle: ' + handle.id);
			// console.log('moves handle: ' + handle.className);
			return handle.classList.contains('title');
		},
		accepts: function (el, target, source, sibling) 
		{
			// console.log('accepts el: ' + el);
			// console.log('accepts target: ' + target);
			// console.log('accepts source: ' + source);
			// console.log('accepts sibling: ' + sibling);
		  return true; // elements can be dropped in any of the `containers` by default
		},
		invalid: function (el, handle) 
		{
			// console.log('invalid el: ' + el);
			// console.log('invalid handle: ' + handle);
		  return false; // don't prevent any drags from initiating by default
		},
		direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
		copy: false,                       // elements are moved by default, not copied
		copySortSource: false,             // elements in copy-source containers can be reordered
		revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
		removeOnSpill: false,              // spilling will `.remove` the element, if this is true
		mirrorContainer: document.body,    // set the element that gets mirror elements appended
		ignoreInputTextSelection: true     // allows users to select input text, see details below
	  });
}

startDragula();
drake.on('drop',function (el) 
{
	console.log('dropped');
	// saveFolderOrder();
	setTimeout(saveFolderOrder, 250);

})

drake.on('drag',function (el) 
{
	console.log('drag');
})

function saveFolderOrder()
{

	var folderOrder = '';
	
	var divs  = document.getElementById('main').getElementsByTagName('div');
	for (var i = 0; i < divs.length; i += 1) 
	{
	
		if (
			divs[i].className == 'folder'
			|| divs[i].className == 'specialfolder'
			)
		{
			if (folderOrder == '')
			{
				folderOrder = divs[i].id;
			}
			else
			{
				folderOrder = folderOrder + ',' + divs[i].id;
			}
			
		}
	}

	setConfig('folderOrder',folderOrder);
	console.log(config);
	console.log(folderOrder);
}




function runAtStart()
{
	console.log(config);
	console.log(getConfig('folderOrder')); 
	// setTimeout(showAllConfig,10000);
}
// runAtStart();


//   dragula([document.getElementById(left), document.getElementById(right)])
//   dragula([document.getElementById('main')]) 
//   .on('drag', function (el) 
//   {
// 	console.log('drag');
//     // el.className = el.className.replace('ex-moved', '');
//   })
//   .on('drop', function (el) 
//   {
// 	  console.log('dropped');
//     el.className += ' ex-moved';
//   })
//   .on('over', function (el, container) 
//   {
// 	console.log('over');
//     // container.className += ' ex-over';
//   })
//   .on('out', function (el, container) 
//   {
// 	console.log('out');
//     // container.className = container.className.replace('ex-over', '');
//   });