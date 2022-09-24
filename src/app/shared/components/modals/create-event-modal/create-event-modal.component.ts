import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {levels, sports} from "./create-event.config";
import {MatStepper} from "@angular/material/stepper";
import {auto} from "@popperjs/core";
import {MapsAPILoader} from "@agm/core";
import {DateAdapter} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {EventsService} from "../../../../services/events.service";

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('search') searchElementRef: ElementRef;
  todayDate: any;
  currentTime: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  sports = sports;
  levels = levels;
  sportControl = new FormControl(this.sports[0].value)
  levelControl = new FormControl(this.levels[0].value)
  mapLoaded: Promise<boolean>
  latitude: any
  longitude: any
  locationChosen = false;
  map: google.maps.Map;
  mapClickListener: google.maps.MapsEventListener;
  zoom = 8
  fullLocation: any;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private ngZone: NgZone,
              private mapsApiLoader: MapsAPILoader,
              private datePipe: DatePipe,
              private eventService: EventsService
) {
    this.todayDate = new Date();
    this.currentTime = this.datePipe.transform(this.todayDate, "shortTime")
    this.todayDate.setDate(this.todayDate.getDate())
  }

  ngOnInit(): void {
    this.getUserLocation();
    this.firstFormGroup = this.formBuilder.group({
      sport: this.sportControl,
      level: this.levelControl,
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
      maxPlayers: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.findAddress()
  }

  createEvent() {
    console.log(this.firstFormGroup.value)
    this.secondFormGroup.value.date = this.datePipe.transform(this.secondFormGroup.value.date, 'mediumDate')
    this.secondFormGroup.value.location = this.fullLocation
    console.log(this.secondFormGroup.value)
    const fullForm = { ...this.firstFormGroup.value, ...this.secondFormGroup.value}
    this.eventService.createEvent(fullForm).subscribe(response =>
      console.log(response)
    );
  }

  findAddress() {
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // some details
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.fullLocation = (place.name)
          this.latitude = place.geometry?.location.lat();
          this.longitude = place.geometry?.location.lng();
          this.locationChosen = true;
          this.zoom = 14;
        });
      });
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.mapLoaded = Promise.resolve(true)
      });
    }
  }

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.ngZone.run(() => {
        this.longitude = e.latLng.lng();
        this.latitude = e.latLng.lat();
        this.locationChosen = true;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

  goBack(stepper: MatStepper) {
    console.log(stepper)
    stepper.linear = false;
    setTimeout(() => {
      stepper.linear = true;
    });
  }
}
