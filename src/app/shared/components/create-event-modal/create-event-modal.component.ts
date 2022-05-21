import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {levels, sports} from "./create-event.config";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {
  @ViewChild('stepper')  stepper: MatStepper;

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


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.getUserLocation();
    this.firstFormGroup = this.formBuilder.group({
      sport: this.sportControl,
      level: this.levelControl,
      players: [''],
      description: ['']
    });
    this.secondFormGroup = this.formBuilder.group({});
  }

  getUserLocation() {
    if (navigator.geolocation) {
       window.navigator.geolocation.getCurrentPosition( position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.mapLoaded = Promise.resolve(true)
       });
    }
  }
  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
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
