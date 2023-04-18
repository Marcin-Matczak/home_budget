// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"61STL":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ea341f70ba6c99c0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aNMGc":[function(require,module,exports) {
var _configJs = require("./config.js");
var _modelJs = require("./model.js");
var _viewJs = require("./view.js");
var _helpersJs = require("./helpers.js");
// Info panel
(0, _configJs.select).closeInfoButton.addEventListener("click", function(event) {
    event.preventDefault();
    (0, _configJs.select).infoPanel.classList.add((0, _configJs.classNames).visibility);
});
(0, _configJs.select).infoButton.addEventListener("click", function(event) {
    event.preventDefault();
    (0, _configJs.select).infoPanel.classList.toggle((0, _configJs.classNames).visibility);
});
// New account
let newUserAccount;
const newAccount = function() {
    const owner = (0, _configJs.select).inputFirstName.value + " " + (0, _configJs.select).inputLastName.value;
    if ((0, _modelJs.accounts).find((acc)=>acc.owner === owner)) {
        (0, _viewJs.validationData)((0, _configJs.alerts).existingAccount);
        return;
    }
    const pin = Number((0, _configJs.select).inputSetupPin.value);
    newUserAccount = {
        owner,
        pin,
        movements: [],
        movementsHTML: []
    };
    (0, _modelJs.accounts).push(newUserAccount);
    createUsernames((0, _modelJs.accounts));
    (0, _helpersJs.clearInputsForm)((0, _configJs.select).infoForm);
    (0, _configJs.select).infoForm.classList.add((0, _configJs.classNames).visibility);
    (0, _configJs.select).successInfo.classList.remove((0, _configJs.classNames).hidden);
    (0, _helpersJs.setLocalStorage)((0, _modelJs.accounts));
};
(0, _configJs.select).infoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!(0, _viewJs.validationInputs)((0, _configJs.select).inputFirstName, (0, _configJs.select).inputLastName, (0, _configJs.select).inputSetupPin)) return;
    newAccount();
});
// Added username as property into each account and save logged user account
const createUsernames = function(accounts) {
    accounts.forEach(function(account) {
        account.username = account.owner.toLowerCase().split(" ")[0];
    });
};
let loggedUserAccount;
const loggedUser = function() {
    loggedUserAccount = (0, _modelJs.accounts).find((acount)=>acount.username === (0, _configJs.select).inputUserNameLogin.value);
};
// Create html movements for existing fictitious accounts
const savedMovements = function(accounts) {
    accounts.forEach(function(account) {
        account.movementsHTML = [];
        account?.movements.forEach(function(mov) {
            const coinIcon = '<i class="fa-solid fa-coins fa-lg"></i>';
            const descr = "sample transaction";
            const type = mov > 0 ? "deposit" : "withdrawal";
            account.movementsHTML.push((0, _helpersJs.htmlCreator)(coinIcon, mov, type, descr));
        });
    });
};
// Open user panel
const welcomePanel = function() {
    loggedUser();
    if (loggedUserAccount?.pin === Number((0, _configJs.select).inputPasswordLogin.value)) {
        (0, _viewJs.toggleVisibility)();
        (0, _configJs.select).welcomeInfo.textContent = `Welcome back, ${loggedUserAccount.owner.split(" ")[0]}!`;
        (0, _helpersJs.clearInputsForm)((0, _configJs.select).loginForm);
        (0, _configJs.select).inputPasswordLogin.blur();
        (0, _configJs.select).logoutButton.textContent = "Out";
        (0, _configJs.select).inputUserNameLogin.disabled = (0, _configJs.select).inputPasswordLogin.disabled = true;
    } else {
        (0, _viewJs.validationData)((0, _configJs.alerts).wrongLoginData);
        return;
    }
    (0, _helpersJs.updateUserPanelData)(loggedUserAccount);
};
// Logout/Login - functionality
(0, _configJs.select).loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    (0, _configJs.select).userPanel.classList.contains((0, _configJs.classNames).hidden) ? welcomePanel() : (0, _viewJs.logOut)();
    (0, _helpersJs.setLocalStorage)((0, _modelJs.accounts));
});
// Internal Money Transfer
const InternalMoneyTransfer = function() {
    const amount = Number((0, _configJs.select).inputTransferAmount.value);
    const reciverAccount = (0, _modelJs.accounts).find((acount)=>acount.username === (0, _configJs.select).inputTransferTo.value);
    if (amount > 0 && reciverAccount && loggedUserAccount.balance >= amount && reciverAccount?.username !== loggedUserAccount.username) {
        (0, _viewJs.renderTransfersType)(amount, loggedUserAccount.owner, reciverAccount.owner);
        loggedUserAccount.movements.push(-amount);
        loggedUserAccount.movementsHTML.push((0, _viewJs.transferType).withdrawalhtml);
        (0, _helpersJs.updateUserPanelData)(loggedUserAccount);
        reciverAccount.movements.push(amount);
        reciverAccount.movementsHTML.push((0, _viewJs.transferType).deposithtml);
        (0, _helpersJs.clearInputsForm)((0, _configJs.select).transferForm);
    } else {
        (0, _helpersJs.clearInputsForm)((0, _configJs.select).transferForm);
        (0, _viewJs.validationData)((0, _configJs.alerts).wrongReciverData);
    }
};
(0, _configJs.select).moneyTransferButton.addEventListener("click", function(event) {
    event.preventDefault();
    InternalMoneyTransfer();
    (0, _helpersJs.setLocalStorage)((0, _modelJs.accounts));
});
// Deposit / Withdrawal
let iconType;
const depositMoney = function() {
    const amount = Number((0, _configJs.select).inputDeposit.value);
    const iconDescription = [
        ...(0, _configJs.movementsIcons)
    ].find((arr)=>arr.includes(iconType))[0];
    if (amount) {
        const mov = iconType === "salary" ? amount : -amount;
        if (-mov > loggedUserAccount.balance) {
            (0, _helpersJs.clearInputsForm)((0, _configJs.select).depositForm);
            (0, _viewJs.validationData)((0, _configJs.alerts).lackMoney);
            return;
        }
        const type = mov > 0 ? "deposit" : "withdrawal";
        const icon = (0, _configJs.movementsIcons).get(iconType);
        loggedUserAccount.movements.push(mov);
        loggedUserAccount.movementsHTML.push((0, _helpersJs.htmlCreator)(icon, mov, type, iconDescription));
        (0, _helpersJs.updateUserPanelData)(loggedUserAccount);
        (0, _helpersJs.clearInputsForm)((0, _configJs.select).depositForm);
    } else (0, _viewJs.validationData)((0, _configJs.alerts).incorrectValue);
};
(0, _configJs.select).depositButton.addEventListener("click", function(event) {
    event.preventDefault();
    depositMoney();
    (0, _helpersJs.setLocalStorage)((0, _modelJs.accounts));
});
// Deposit / Withdrawal - icons
(0, _configJs.select).iconsWrapper.addEventListener("click", function(event) {
    event.preventDefault();
    const clickedIcon = event.target.closest(".icons__icon");
    if (!clickedIcon) return;
    iconType = clickedIcon.getAttribute("aria-label");
});
// Close account
const closeAccount = function() {
    const userLogin = (0, _configJs.select).closeUserInput.value;
    const userPin = Number((0, _configJs.select).closePinInput.value);
    if (userLogin === loggedUserAccount.username && userPin === loggedUserAccount.pin) {
        (0, _modelJs.accounts).splice((0, _modelJs.accounts).indexOf((0, _modelJs.accounts).find((account)=>account.pin === userPin)), 1);
        (0, _helpersJs.clearInputsForm)((0, _configJs.select).closeForm);
        (0, _viewJs.logOut)();
    } else {
        (0, _helpersJs.clearInputsForm)((0, _configJs.select).closeForm);
        (0, _viewJs.validationData)((0, _configJs.alerts).wrongLoginData);
    }
};
(0, _configJs.select).closeAccountBtn.addEventListener("click", function(event) {
    event.preventDefault();
    closeAccount();
    (0, _helpersJs.setLocalStorage)((0, _modelJs.accounts));
});
const init = function() {
    if (localStorage.getItem("budget_app") === null) {
        createUsernames((0, _modelJs.accounts));
        savedMovements((0, _modelJs.accounts));
        (0, _helpersJs.setLocalStorage)((0, _modelJs.accounts));
        (0, _modelJs.getLocalStorage)();
    } else (0, _modelJs.getLocalStorage)();
};
init();

},{"./config.js":"k5Hzs","./model.js":"Y4A21","./view.js":"ky8MP","./helpers.js":"hGI1E"}],"k5Hzs":[function(require,module,exports) {
// Elements
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "select", ()=>select);
parcelHelpers.export(exports, "classNames", ()=>classNames);
parcelHelpers.export(exports, "movementsIcons", ()=>movementsIcons);
parcelHelpers.export(exports, "alerts", ()=>alerts);
const select = {
    welcomeInfo: document.querySelector(".navigation__welcome"),
    loginForm: document.querySelector(".navigation__login"),
    inputUserNameLogin: document.querySelector(".form__user"),
    inputPasswordLogin: document.querySelector(".form__pin"),
    loginButton: document.querySelector(".form__btn--login"),
    logoutButton: document.querySelector(".form__btn--logout"),
    infoButton: document.querySelector(".info-icon"),
    infoPanel: document.querySelector(".info"),
    closeInfoButton: document.querySelector(".info__closeIcon"),
    infoForm: document.querySelector(".info__form"),
    inputFirstName: document.querySelector(".form__firstName"),
    inputLastName: document.querySelector(".form__lastName"),
    inputSetupPin: document.querySelector(".form__setup-pin"),
    successInfo: document.querySelector(".info__success"),
    userPanel: document.querySelector(".user-panel"),
    balanceDate: document.querySelector(".header__date"),
    currentBalance: document.querySelector(".header__balance"),
    movementsContainer: document.querySelector(".table__tbody"),
    transferForm: document.querySelector(".transfer__form"),
    inputTransferTo: document.querySelector(".form__to"),
    inputTransferAmount: document.querySelector(".form__amount"),
    moneyTransferButton: document.querySelector(".btn__form--transfer"),
    depositForm: document.querySelector(".request__form"),
    inputDeposit: document.querySelector(".form__deposit"),
    depositButton: document.querySelector(".btn__form--deposit"),
    iconsWrapper: document.querySelector(".icons"),
    closeForm: document.querySelector(".close__form"),
    closeUserInput: document.querySelector(".form__close-user"),
    closePinInput: document.querySelector(".form__close-pin"),
    closeAccountBtn: document.querySelector(".btn__form--close"),
    inSummary: document.querySelector(".footer__in"),
    outSummary: document.querySelector(".footer__out")
};
const classNames = {
    visibility: "visibility",
    hidden: "hidden"
};
const movementsIcons = new Map();
movementsIcons.set("salary", '<i class="fa-solid fa-sack-dollar fa-lg"></i>').set("entertainment", '<i class="fa-solid fa-music fa-lg"></i>').set("vehicles", '<i class="fa-solid fa-solid fa-car fa-lg"></i>').set("fees", '<i class="fa-solid fa-file-invoice-dollar fa-lg"</i>').set("clothes", '<i class="fa-sharp fa-solid fa-shirt fa-lg"></i>').set("home", '<i class="fa-solid fa-house fa-lg"></i>').set("medication", '<i class="fa-solid fa-heart-pulse fa-lg"></i>').set("education", '<i class="fa-solid fa-user-graduate fa-lg"></i>').set("food", '<i class="fa-solid fa-utensils fa-lg"></i>').set("other", '<i class="fa-solid fa-coins fa-lg"></i>');
const alerts = {
    userData: "Wrong data! Remember that the first and last name should start with a capital and cannot contain whitespace or special signs.",
    userPIN: "Incorrect PIN. Please enter a four-digit number.",
    existingAccount: "User  already exists!",
    wrongLoginData: "You have entered an incorrect login or password. Remember that the login is a lowercase name and the pin consists of 4 digits.",
    wrongReciverData: "Incorrect receiver name or insufficient funds on the account.",
    incorrectValue: "Incorrect value!",
    lackMoney: "Insufficient funds on the account."
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"Y4A21":[function(require,module,exports) {
// Accounts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "accounts", ()=>accounts);
parcelHelpers.export(exports, "getLocalStorage", ()=>getLocalStorage);
const account1 = {
    owner: "Marcin Matczak",
    pin: 1202,
    movements: [
        1000,
        200,
        -400,
        150,
        -300,
        280,
        900
    ]
};
const account2 = {
    owner: "Jim Beam",
    pin: 1111,
    movements: []
};
const account3 = {
    owner: "John Doe",
    pin: 1996,
    movements: [
        8000,
        -2000,
        1500,
        -7600,
        1050,
        -950,
        200,
        12000,
        8000,
        -2000,
        -100,
        -1900,
        340,
        -650
    ]
};
let accounts = [
    account1,
    account2,
    account3
];
const getLocalStorage = function() {
    const data = JSON.parse(localStorage.getItem("budget_app"));
    if (!data) return;
    accounts = data;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ky8MP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toggleVisibility", ()=>toggleVisibility);
parcelHelpers.export(exports, "logOut", ()=>logOut);
parcelHelpers.export(exports, "currFormat", ()=>currFormat);
parcelHelpers.export(exports, "validationInputs", ()=>validationInputs);
parcelHelpers.export(exports, "validationData", ()=>validationData);
parcelHelpers.export(exports, "balance", ()=>balance);
parcelHelpers.export(exports, "transactionSummary", ()=>transactionSummary);
parcelHelpers.export(exports, "renderMovements", ()=>renderMovements);
parcelHelpers.export(exports, "transferType", ()=>transferType);
parcelHelpers.export(exports, "renderTransfersType", ()=>renderTransfersType);
var _configJs = require("./config.js");
var _helpersJs = require("./helpers.js");
const toggleVisibility = function() {
    if ((0, _configJs.select).userPanel.classList.contains((0, _configJs.classNames).hidden)) {
        (0, _configJs.select).infoPanel.classList.add((0, _configJs.classNames).hidden);
        (0, _configJs.select).infoButton.classList.add((0, _configJs.classNames).hidden);
        (0, _configJs.select).userPanel.classList.remove((0, _configJs.classNames).hidden);
    } else {
        (0, _configJs.select).userPanel.classList.add((0, _configJs.classNames).hidden);
        (0, _configJs.select).infoButton.classList.remove((0, _configJs.classNames).hidden);
        (0, _configJs.select).infoPanel.classList.add((0, _configJs.classNames).visibility);
        (0, _configJs.select).infoPanel.classList.remove((0, _configJs.classNames).hidden);
    }
};
const logOut = function() {
    toggleVisibility();
    (0, _configJs.select).logoutButton.textContent = "In";
    (0, _configJs.select).welcomeInfo.textContent = "Please Log In";
    (0, _configJs.select).inputUserNameLogin.disabled = (0, _configJs.select).inputPasswordLogin.disabled = false;
};
// Currency and date display format
const date = new Intl.DateTimeFormat(navigator.language).format(new Date());
(0, _configJs.select).balanceDate.textContent = date;
const currFormat = function(value) {
    const format = new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "PLN"
    }).format(value);
    return format;
};
const validationInputs = function(personFirstName, personLastName, pin) {
    const userFirstName = personFirstName.value;
    const userLastName = personLastName.value;
    const pinData = Number(pin.value);
    const capitalLetters = /[A-Z]/;
    const smallLetters = /^[a-z]+$/;
    if (userFirstName.slice(1).match(smallLetters) && userFirstName[0].match(capitalLetters) && userLastName.slice(1).match(smallLetters) && userLastName[0].match(capitalLetters)) {
        if (typeof pinData === "number" && pinData.toString().length === 4) return true;
        else {
            alert((0, _configJs.alerts).userPIN);
            return false;
        }
    } else {
        alert((0, _configJs.alerts).userData);
        return false;
    }
};
const validationData = function(info) {
    alert(info);
};
const balance = function(account) {
    const amount = account.movements.reduce((acc, mov)=>acc + mov, 0);
    (0, _configJs.select).currentBalance.textContent = currFormat(amount);
    account.balance = amount;
};
const transactionSummary = function(movements) {
    const inTransaction = movements.filter((mov)=>mov > 0).reduce((acc, mov)=>acc + mov, 0);
    (0, _configJs.select).inSummary.textContent = currFormat(inTransaction);
    const outTransaction = movements.filter((mov)=>mov < 0).reduce((acc, mov)=>acc + mov, 0);
    (0, _configJs.select).outSummary.textContent = currFormat(-outTransaction);
};
const renderMovements = function(account) {
    (0, _configJs.select).movementsContainer.innerHTML = "";
    account.movementsHTML.forEach((mov)=>{
        (0, _configJs.select).movementsContainer.insertAdjacentHTML("afterbegin", mov);
    });
};
let transferType = {};
const renderTransfersType = function(amount, sender, reciver) {
    const icon = '<i class="fa-solid fa-user fa-lg"></i>';
    const deposit = "deposit";
    const withdrawal = "withdrawal";
    transferType = {
        deposithtml: (0, _helpersJs.htmlCreator)(icon, amount, deposit, sender),
        withdrawalhtml: (0, _helpersJs.htmlCreator)(icon, -amount, withdrawal, reciver)
    };
    return transferType;
};

},{"./config.js":"k5Hzs","./helpers.js":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGI1E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateUserPanelData", ()=>updateUserPanelData);
parcelHelpers.export(exports, "setLocalStorage", ()=>setLocalStorage);
parcelHelpers.export(exports, "clearInputsForm", ()=>clearInputsForm);
parcelHelpers.export(exports, "htmlCreator", ()=>htmlCreator);
var _viewJs = require("./view.js");
var _configJs = require("./config.js");
const updateUserPanelData = function(account) {
    (0, _viewJs.renderMovements)(account);
    (0, _viewJs.balance)(account);
    (0, _viewJs.transactionSummary)(account.movements);
};
const setLocalStorage = function(data) {
    localStorage.setItem("budget_app", JSON.stringify(data));
};
const clearInputsForm = function(form) {
    const inputs = form.querySelectorAll(".input");
    inputs.forEach((input)=>input.value = "");
};
const htmlCreator = function(icon, amount, type, descr) {
    const html = `  <tr class='table__tr'>
  <td class='table__td'>${icon}</td>
  <td class='table__td table__td--descr'>${(0, _configJs.select).balanceDate.textContent}</td>
  <td class='table__td table__td--type-${type}'>${type} - <span class='table__td--descr'>${descr}</span></td>
  <td class='table__td'>${(0, _viewJs.currFormat)(amount)}</td>
</tr>`;
    return html;
};

},{"./view.js":"ky8MP","./config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["61STL","aNMGc"], "aNMGc", "parcelRequireffa0")

//# sourceMappingURL=index.ba6c99c0.js.map
