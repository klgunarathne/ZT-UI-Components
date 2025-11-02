import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef, Type } from '@angular/core';

/**
 * Service for lazy loading components dynamically
 * Provides utilities for loading components on demand to improve initial bundle size
 */
@Injectable({
  providedIn: 'root',
})
export class LazyLoadingService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Lazily loads a component by importing its module
   * @param importFn Function that returns a Promise of the component module
   * @param componentName The name of the component to load
   * @returns Promise that resolves to the component type
   */
  async loadComponent<T>(
    importFn: () => Promise<any>,
    componentName: string
  ): Promise<Type<T>> {
    try {
      const module = await importFn();
      return module[componentName];
    } catch (error) {
      console.error(`Failed to lazy load component ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Creates a component dynamically and attaches it to the application
   * @param componentType The component type to create
   * @param hostElement The DOM element to attach to
   * @param inputs Initial input values for the component
   * @returns Component reference
   */
  createComponent<T>(
    componentType: Type<T>,
    hostElement: Element,
    inputs?: Partial<T>
  ): ComponentRef<T> {
    // Create component factory
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    // Create component instance
    const componentRef = factory.create(this.injector);

    // Set input values
    if (inputs) {
      Object.keys(inputs).forEach(key => {
        (componentRef.instance as any)[key] = (inputs as any)[key];
      });
    }

    // Attach to application
    this.appRef.attachView(componentRef.hostView);

    // Add to DOM
    hostElement.appendChild(componentRef.location.nativeElement);

    return componentRef;
  }

  /**
   * Destroys a dynamically created component
   * @param componentRef The component reference to destroy
   */
  destroyComponent<T>(componentRef: ComponentRef<T>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  /**
   * Preloads a component module in the background
   * @param importFn Function that returns a Promise of the component module
   * @returns Promise that resolves when preloading is complete
   */
  preloadComponent(importFn: () => Promise<any>): Promise<void> {
    return importFn().then(() => {
      // Module loaded successfully
    }).catch(error => {
      console.warn('Failed to preload component:', error);
    });
  }

  /**
   * Checks if a component is already loaded
   * @param componentName The name of the component
   * @returns True if component is loaded, false otherwise
   */
  isComponentLoaded(componentName: string): boolean {
    // This is a simplified check - in a real implementation,
    // you might track loaded components in a registry
    return false;
  }

  /**
   * Gets the current bundle size estimate
   * @returns Estimated bundle size in bytes
   */
  getEstimatedBundleSize(): number {
    // This would integrate with build tools to get actual bundle sizes
    // For now, return a placeholder
    return 0;
  }
}
