component_factory(object) ::=<<
$if(object)$$object:{component |  this.dynamicComponentLoader
      .getComponentFactory<HeaderComponent>('$component.value$')
      .subscribe({
        next: componentFactory => {
          if (!this.testOutlet) {
            return;
          \}
         const ref = this.testOutlet.createComponent(componentFactory);
          ref.changeDetectorRef.detectChanges();
        \},
        error: err => {
          console.warn(err);
        \}
      \});};separator="\n"$$endif$
>>