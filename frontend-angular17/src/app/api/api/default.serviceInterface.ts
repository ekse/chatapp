/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { HTTPValidationError } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface DefaultServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Greet
     * 
     * @param name 
     */
    greetGreetNameGet(name: string, extraHttpRequestParams?: any): Observable<any>;

}
