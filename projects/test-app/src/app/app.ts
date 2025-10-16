import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  InputComponent,
  SelectComponent,
  TextareaComponent,
  CardComponent,
  ButtonComponent
} from 'zt-ui-components';
import { ThemeService, ThemeConfig, LIGHT_THEME } from 'zt-ui-components';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Theme management
  currentTheme: string = 'dark';

  // Sample data for components
  frameworks = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue.js' },
    { id: 4, name: 'Svelte' }
  ];

  languages = [
    { code: 'ts', name: 'TypeScript' },
    { code: 'js', name: 'JavaScript' },
    { code: 'py', name: 'Python' },
    { code: 'java', name: 'Java' }
  ];

  sampleData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
    { id: 4, name: 'Alice Brown', age: 28, city: 'Houston' },
    { id: 5, name: 'Charlie Wilson', age: 42, city: 'Phoenix' },
    { id: 6, name: 'Diana Davis', age: 31, city: 'Philadelphia' },
    { id: 7, name: 'Edward Miller', age: 29, city: 'San Antonio' },
    { id: 8, name: 'Fiona Garcia', age: 33, city: 'San Diego' },
    { id: 9, name: 'George Rodriguez', age: 27, city: 'Dallas' },
    { id: 10, name: 'Helen Martinez', age: 36, city: 'San Jose' }
  ];

  gridColumns = [
    { field: 'id', title: 'ID', width: '80px', sortable: true },
    { field: 'name', title: 'Name', sortable: true },
    { field: 'age', title: 'Age', width: '100px', sortable: true },
    { field: 'city', title: 'City', sortable: true }
  ];

  // Custom theme overrides
  customButtonTheme: Partial<ThemeConfig> = {
    colors: {
      ...LIGHT_THEME.colors,
      primary: '#ff6b6b',
      textBlack: '#ffffff'
    },
    borderRadius: 25
  };

  customCardTheme: Partial<ThemeConfig> = {
    colors: {
      ...LIGHT_THEME.colors,
      primary: '#4ecdc4',
      default: '#f0f9ff'
    },
    borderRadius: 16
  };

  customInputTheme: Partial<ThemeConfig> = {
    colors: {
      ...LIGHT_THEME.colors,
      primary: '#9b59b6',
      textBlack: '#2c3e50'
    },
    borderRadius: 8
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme.name;
    });

    // Set initial theme
    this.themeService.setThemeByName('light');
  }

  // Theme switching methods
  setTheme(themeName: string) {
    this.themeService.setThemeByName(themeName as any);
  }

  // Event handlers
  onPageChange(page: number) {
    console.log('Page changed to:', page);
  }
}
