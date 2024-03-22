/******/ var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _nestjs_core__WEBPACK_IMPORTED_MODULE_1__, _nestjs_config__WEBPACK_IMPORTED_MODULE_2__, _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__, helmet__WEBPACK_IMPORTED_MODULE_4__, _app_module__WEBPACK_IMPORTED_MODULE_5__]);
([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _nestjs_core__WEBPACK_IMPORTED_MODULE_1__, _nestjs_config__WEBPACK_IMPORTED_MODULE_2__, _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__, helmet__WEBPACK_IMPORTED_MODULE_4__, _app_module__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const app = await _nestjs_core__WEBPACK_IMPORTED_MODULE_1__.NestFactory.create(_app_module__WEBPACK_IMPORTED_MODULE_5__.AppModule, {
    logger: process.env.NODE_ENV === 'production' ? false : undefined,
});
app.useGlobalPipes(new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.ValidationPipe({
    whitelist: true,
}));
app.use((0,helmet__WEBPACK_IMPORTED_MODULE_4__["default"])());
const config = app.get(_nestjs_config__WEBPACK_IMPORTED_MODULE_2__.ConfigService);
const nodeEnv = config.get('nodeEnv', { infer: true });
const frontendUrl = config.get('frontendUrl', { infer: true });
app.enableCors({ origin: frontendUrl });
if (nodeEnv === 'development') {
    const swaggerConfig = new _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.DocumentBuilder().setTitle('Kynesis Dashboard').setDescription('The Kynesis Dashboard API Description').setVersion('1.0').build();
    const document = _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.SwaggerModule.createDocument(app, swaggerConfig);
    _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.SwaggerModule.setup('api', app, document);
}
const port = config.get('port', { infer: true });
await app.listen(port);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = import("@nestjs/common");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = import("@nestjs/core");;

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = import("@nestjs/config");;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = import("@nestjs/swagger");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = import("helmet");;

/***/ }),
/* 6 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _config_env_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _config_configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _modules_health_health_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _nestjs_config__WEBPACK_IMPORTED_MODULE_1__, _config_env_validation__WEBPACK_IMPORTED_MODULE_2__, _modules_health_health_module__WEBPACK_IMPORTED_MODULE_4__]);
([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _nestjs_config__WEBPACK_IMPORTED_MODULE_1__, _config_env_validation__WEBPACK_IMPORTED_MODULE_2__, _modules_health_health_module__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let AppModule = class AppModule {
};
AppModule = __decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Module)({
        imports: [
            _nestjs_config__WEBPACK_IMPORTED_MODULE_1__.ConfigModule.forRoot({
                load: [_config_configuration__WEBPACK_IMPORTED_MODULE_3__["default"]],
                isGlobal: true,
                cache: true,
                validate: _config_env_validation__WEBPACK_IMPORTED_MODULE_2__.validate,
                validationOptions: {
                    allowUnknown: false,
                    abortEarly: true,
                },
            }),
            _modules_health_health_module__WEBPACK_IMPORTED_MODULE_4__.HealthModule,
        ],
    })
], AppModule);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 7 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
/* harmony import */ var class_transformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([class_transformer__WEBPACK_IMPORTED_MODULE_0__, class_validator__WEBPACK_IMPORTED_MODULE_1__]);
([class_transformer__WEBPACK_IMPORTED_MODULE_0__, class_validator__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


class EnvironmentVariables {
    NODE_ENV;
    PORT;
    FRONTEND_URL;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsIn)(['development', 'production']),
    __metadata("design:type", Object)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsInt)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsPositive)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FRONTEND_URL", void 0);
const validate = (config) => {
    const validatedConfig = (0,class_transformer__WEBPACK_IMPORTED_MODULE_0__.plainToClass)(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validateSync)(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = import("class-transformer");;

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = import("class-validator");;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const EnvConfiguration = () => ({
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    frontendUrl: process.env.FRONTEND_URL,
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EnvConfiguration);


/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HealthModule: () => (/* binding */ HealthModule)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _version_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _version_controller__WEBPACK_IMPORTED_MODULE_1__]);
([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _version_controller__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let HealthModule = class HealthModule {
};
HealthModule = __decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Module)({
        controllers: [_version_controller__WEBPACK_IMPORTED_MODULE_1__.VersionController],
    })
], HealthModule);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VersionController: () => (/* binding */ VersionController)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _health_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__]);
([_nestjs_common__WEBPACK_IMPORTED_MODULE_0__, _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let VersionController = class VersionController {
    version() {
        return `Kynesis Dashboard v${"1.0.0"}`;
    }
};
__decorate([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiOperation)({ description: 'Get version of dashboard' }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiOkResponse)({ description: "If successfully got dashboard's version" }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Get)(_health_routes__WEBPACK_IMPORTED_MODULE_2__["default"].VERSION),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpCode)(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], VersionController.prototype, "version", null);
VersionController = __decorate([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiTags)('Health'),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Controller)(_health_routes__WEBPACK_IMPORTED_MODULE_2__["default"].CONTROLLER)
], VersionController);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Routes = {
    CONTROLLER: 'health',
    VERSION: 'version',
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Routes);


/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && queue.d < 1) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__webpack_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = -1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && queue.d < 0 && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__(0);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 
