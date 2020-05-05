import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DOMService } from 'src/app/core/services/dom.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("nav", { static: false}) nav: ElementRef<HTMLElement>;
  @ViewChild("navTop", { static: false}) navTop: ElementRef<HTMLElement>;
  
  
  isNavOpen = false;
  constructor(
    private domService: DOMService, 
  ) { 
    
    // To prevent loss of context in event Listener
    this.onScroll = this.onScroll.bind(this);
  }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    window.addEventListener("scroll", this.onScroll, {passive: true});
  }
  
  
  onScroll(){
    this.nav.nativeElement.classList.toggle("is-fixed", window.scrollY > this.navTop.nativeElement.offsetHeight + 50);
  }
  
  onHamburgerClick($event){
    this.nav.nativeElement.classList.toggle("is-mobile-active");
    $event.currentTarget.classList.toggle("is-active");
    this.isNavOpen = !this.isNavOpen;
    
    if (this.isNavOpen) {
      this.domService.lockScroll();
    } else {
      this.domService.unlockScroll();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.onScroll);
  }
}