/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PenaltyController } from './../controllers/penaltyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WorkoutsController } from './../controllers/WorkoutsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AthletesController } from './../controllers/AthleteController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Penalty": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
            "plate": {"dataType":"string","required":true},
            "reason": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PenaltyDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "username": {"dataType":"string","required":true},
            "plate": {"dataType":"string","required":true},
            "reason": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkoutResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "athleteId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkoutCreate": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "athleteId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkoutIARequest": {
        "dataType": "refObject",
        "properties": {
            "athleteId": {"dataType":"double","required":true},
            "workoutFocus": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AthleteResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "age": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "height": {"dataType":"double","required":true},
            "goal": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AthleteCreate": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "age": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "height": {"dataType":"double","required":true},
            "goal": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPenaltyController_create: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"body","name":"request","required":true,"ref":"PenaltyDTO"},
        };
        app.post('/penalties',
            ...(fetchMiddlewares<RequestHandler>(PenaltyController)),
            ...(fetchMiddlewares<RequestHandler>(PenaltyController.prototype.create)),

            async function PenaltyController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPenaltyController_create, request, response });

                const controller = new PenaltyController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWorkoutsController_listWorkouts: Record<string, TsoaRoute.ParameterSchema> = {
                skip: {"default":0,"in":"query","name":"skip","dataType":"double"},
                limit: {"default":100,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/workouts',
            ...(fetchMiddlewares<RequestHandler>(WorkoutsController)),
            ...(fetchMiddlewares<RequestHandler>(WorkoutsController.prototype.listWorkouts)),

            async function WorkoutsController_listWorkouts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWorkoutsController_listWorkouts, request, response });

                const controller = new WorkoutsController();

              await templateService.apiHandler({
                methodName: 'listWorkouts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWorkoutsController_createWorkout: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"WorkoutCreate"},
        };
        app.post('/workouts',
            ...(fetchMiddlewares<RequestHandler>(WorkoutsController)),
            ...(fetchMiddlewares<RequestHandler>(WorkoutsController.prototype.createWorkout)),

            async function WorkoutsController_createWorkout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWorkoutsController_createWorkout, request, response });

                const controller = new WorkoutsController();

              await templateService.apiHandler({
                methodName: 'createWorkout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWorkoutsController_createWorkoutWithAI: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"WorkoutIARequest"},
                xAiProvider: {"in":"header","name":"x-ai-provider","required":true,"dataType":"string"},
        };
        app.post('/workouts/generate-with-ai',
            ...(fetchMiddlewares<RequestHandler>(WorkoutsController)),
            ...(fetchMiddlewares<RequestHandler>(WorkoutsController.prototype.createWorkoutWithAI)),

            async function WorkoutsController_createWorkoutWithAI(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWorkoutsController_createWorkoutWithAI, request, response });

                const controller = new WorkoutsController();

              await templateService.apiHandler({
                methodName: 'createWorkoutWithAI',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAthletesController_listAthletes: Record<string, TsoaRoute.ParameterSchema> = {
                skip: {"default":0,"in":"query","name":"skip","dataType":"double"},
                limit: {"default":100,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/athletes',
            ...(fetchMiddlewares<RequestHandler>(AthletesController)),
            ...(fetchMiddlewares<RequestHandler>(AthletesController.prototype.listAthletes)),

            async function AthletesController_listAthletes(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAthletesController_listAthletes, request, response });

                const controller = new AthletesController();

              await templateService.apiHandler({
                methodName: 'listAthletes',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAthletesController_createAthlete: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"AthleteCreate"},
        };
        app.post('/athletes',
            ...(fetchMiddlewares<RequestHandler>(AthletesController)),
            ...(fetchMiddlewares<RequestHandler>(AthletesController.prototype.createAthlete)),

            async function AthletesController_createAthlete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAthletesController_createAthlete, request, response });

                const controller = new AthletesController();

              await templateService.apiHandler({
                methodName: 'createAthlete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAthletesController_listAthleteWorkouts: Record<string, TsoaRoute.ParameterSchema> = {
                athleteId: {"in":"path","name":"athleteId","required":true,"dataType":"double"},
        };
        app.get('/athletes/:athleteId/workouts',
            ...(fetchMiddlewares<RequestHandler>(AthletesController)),
            ...(fetchMiddlewares<RequestHandler>(AthletesController.prototype.listAthleteWorkouts)),

            async function AthletesController_listAthleteWorkouts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAthletesController_listAthleteWorkouts, request, response });

                const controller = new AthletesController();

              await templateService.apiHandler({
                methodName: 'listAthleteWorkouts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
