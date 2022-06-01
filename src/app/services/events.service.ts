import {Injectable} from "@angular/core";
import {UserLoginModel} from "../shared/models/user.model";
import {Observable} from "rxjs";
import {ApiUrls} from "../core/constants/api-urls";
import {EventCardModel, EventPostModel} from "../shared/models/event-card.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {tokenGetter} from "../app.module";
import {PagingModel} from "../shared/models/paging.model";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {
  }

  getAllUnapprovedEvents(pageIndex: number, pageSize: number): Observable<any> {
    let requestPaging: PagingModel = { page: pageIndex, size: pageSize}
    let requestParams = new HttpParams();
    Object.keys(requestPaging).forEach(function (key){
      requestParams = requestParams.append(key, requestPaging[key as keyof PagingModel])
    })
    return this.http.get(`${ApiUrls.API_MAIN}events/unapproved/?${requestParams}`)
  }

  getAllEvents(pageIndex: number, pageSize: number): Observable<any> {
    let requestPaging: PagingModel = { page: pageIndex, size:pageSize}
    let requestParams = new HttpParams();
    Object.keys(requestPaging).forEach(function (key){
      requestParams = requestParams.append(key, requestPaging[key as keyof PagingModel])
    })
    return this.http.get(`${ApiUrls.API_MAIN}events/?${requestParams}`)
  }

  getAllAcceptedEvents(pageIndex: number, pageSize: number): Observable<any>  {
    let requestPaging: PagingModel = { page: pageIndex, size:pageSize}
    let requestParams = new HttpParams();
    Object.keys(requestPaging).forEach(function (key){
      requestParams = requestParams.append(key, requestPaging[key as keyof PagingModel])
    })
    return this.http.get(`${ApiUrls.API_MAIN}events/accepted/?${requestParams}`)
  }

  acceptEvent(eventId: string, approved: boolean): Observable<any> {
    return this.http.post<any>(`${ApiUrls.API_MAIN}events/accept/${eventId}`, approved);
  }

  joinEvent(eventId: string, email: string): Observable<any>{
    return this.http.post<any>(`${ApiUrls.API_MAIN}events/join/${eventId}`, email);
  }

  leaveEvent(eventId: string, email: string): Observable<any>{
    return this.http.post<any>(`${ApiUrls.API_MAIN}events/leave/${eventId}`, email);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete<any>(`${ApiUrls.API_MAIN}events/delete/${eventId}`)
  }

  createEvent(body: EventPostModel): Observable<any>{
    return this.http.post<any>(`${ApiUrls.API_MAIN}events/create`, body)
  }

  getPendingEventsByEmail(): Observable<any>{
    return this.http.get<any>(`${ApiUrls.API_MAIN}events/user/pending`)
  }

  getAcceptedEventsByEmail(): Observable<any>{
    return this.http.get<any>(`${ApiUrls.API_MAIN}events/user/accepted`)
  }

  getRejectedEventsByEmail(): Observable<any>{
    return this.http.get<any>(`${ApiUrls.API_MAIN}events/user/rejected`)
  }
}

