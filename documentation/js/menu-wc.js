'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">zt-ui-components documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ZtCardModule.html" data-type="entity-link" >ZtCardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtDataGridModule.html" data-type="entity-link" >ZtDataGridModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtInputModule.html" data-type="entity-link" >ZtInputModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtModalModule.html" data-type="entity-link" >ZtModalModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtPaginatorModule.html" data-type="entity-link" >ZtPaginatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtSelectModule.html" data-type="entity-link" >ZtSelectModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtTextareaModule.html" data-type="entity-link" >ZtTextareaModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZtToastModule.html" data-type="entity-link" >ZtToastModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent-1.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardComponent.html" data-type="entity-link" >CardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputComponent.html" data-type="entity-link" >InputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageComponent.html" data-type="entity-link" >PageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectComponent.html" data-type="entity-link" >SelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToggleComponent.html" data-type="entity-link" >ToggleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZtDataGridComponent.html" data-type="entity-link" >ZtDataGridComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZtModalComponent.html" data-type="entity-link" >ZtModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZtToastComponent.html" data-type="entity-link" >ZtToastComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZtUiComponents.html" data-type="entity-link" >ZtUiComponents</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/ThemeDirective.html" data-type="entity-link" >ThemeDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ThemeValidationService.html" data-type="entity-link" >ThemeValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZTThemeService.html" data-type="entity-link" >ZTThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZtToastService.html" data-type="entity-link" >ZtToastService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DataGridColumn.html" data-type="entity-link" >DataGridColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridEvent.html" data-type="entity-link" >DataGridEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridFilterState.html" data-type="entity-link" >DataGridFilterState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridGroupRow.html" data-type="entity-link" >DataGridGroupRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridGroupState.html" data-type="entity-link" >DataGridGroupState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridOptions.html" data-type="entity-link" >DataGridOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridRow.html" data-type="entity-link" >DataGridRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridSelectionState.html" data-type="entity-link" >DataGridSelectionState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridSortState.html" data-type="entity-link" >DataGridSortState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridState.html" data-type="entity-link" >DataGridState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGridSummary.html" data-type="entity-link" >DataGridSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeColors.html" data-type="entity-link" >ThemeColors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeConfig.html" data-type="entity-link" >ThemeConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeContext.html" data-type="entity-link" >ThemeContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeValidationResult.html" data-type="entity-link" >ThemeValidationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ZtToast.html" data-type="entity-link" >ZtToast</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});