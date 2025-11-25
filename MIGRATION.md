# Migration Guide: ZT-UI Components v2.0.0

This guide helps you migrate from ZT-UI Components v1.x to v2.0.0, which introduces major improvements in import architecture and component usage patterns.

## 🚀 What's New in v2.0.0

### Key Changes
- **Specific Import Paths**: Components available via dedicated paths for optimal tree-shaking
- **Standalone-First**: Modern Angular standalone components as the primary API
- **Module Deprecation**: Traditional NgModules deprecated with clear migration path
- **Enhanced Performance**: Better tree-shaking and smaller bundle sizes

## 📋 Migration Checklist

### Phase 1: Immediate Actions (Required)
- [ ] Update import statements
- [ ] Test application builds
- [ ] Verify component functionality

### Phase 2: Recommended Updates (Optional)
- [ ] Migrate to standalone components
- [ ] Update module declarations
- [ ] Optimize bundle sizes

## 🔄 Import Migration

### Component Imports

**❌ Before (v1.x):**
```typescript
// Single import for all components
import { ZtButton, ZtInput, ZtCard } from 'zt-ui-components';

// Module-based imports
import { ZtButtonModule } from 'zt-ui-components';
```

**✅ After (v2.0) - Recommended:**
```typescript
// Standalone components (recommended)
import { ZtButton, ZtInput, ZtCard } from 'zt-ui-components';

// Tree-shakable specific imports
import { ZtButton } from 'zt-ui-components/ui/button';
import { ZtInput } from 'zt-ui-components/ui/input';
import { ZtCard } from 'zt-ui-components/ui/card';
```

**⚠️ After (v2.0) - Deprecated but supported:**
```typescript
// Shows console warnings - migrate away from these
import { ZTButtonModule } from 'zt-ui-components/ui/button';
import { ZTInputModule } from 'zt-ui-components/ui/input';
import { ZTCardModule } from 'zt-ui-components/ui/card';
```

### Module Declarations

**❌ Before (v1.x):**
```typescript
import { ZtButtonModule, ZtInputModule } from 'zt-ui-components';

@NgModule({
  declarations: [/* your components */],
  imports: [
    ZtButtonModule,
    ZtInputModule,
    // ... other modules
  ],
})
export class AppModule {}
```

**✅ After (v2.0) - Standalone Approach:**
```typescript
import { ZtButton, ZtInput } from 'zt-ui-components';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ZtButton, ZtInput],
  template: `
    <zt-button variant="primary">Click me</zt-button>
    <zt-input placeholder="Enter text"></zt-input>
  `,
})
export class MyComponent {}
```

**⚠️ After (v2.0) - Module Approach (Deprecated):**
```typescript
import { ZTButtonModule } from 'zt-ui-components/ui/button';
import { ZTInputModule } from 'zt-ui-components/ui/input';

@NgModule({
  declarations: [/* your components */],
  imports: [
    ZTButtonModule,  // Shows deprecation warning
    ZTInputModule,   // Shows deprecation warning
  ],
})
export class AppModule {}
```

## 🛠️ Component-by-Component Migration

### Button Component

```typescript
// Old way
import { ZtButtonModule } from 'zt-ui-components';

// New way
import { ZtButton } from 'zt-ui-components';
// or
import { ZtButton } from 'zt-ui-components/ui/button';
```

### Input Component

```typescript
// Old way
import { ZtInputModule } from 'zt-ui-components';

// New way
import { ZtInput } from 'zt-ui-components';
// or
import { ZtInput } from 'zt-ui-components/ui/input';
```

### All Components

| Component | Old Import | New Import (Standalone) | New Import (Specific Path) |
|-----------|------------|--------------------------|----------------------------|
| Button | `ZtButtonModule` | `ZtButton` | `zt-ui-components/ui/button` |
| Input | `ZtInputModule` | `ZtInput` | `zt-ui-components/ui/input` |
| Card | `ZtCardModule` | `ZtCard` | `zt-ui-components/ui/card` |
| Select | `ZtSelectModule` | `ZtSelect` | `zt-ui-components/ui/select` |
| Textarea | `ZtTextareaModule` | `ZtTextarea` | `zt-ui-components/ui/textarea` |
| Modal | `ZtModalModule` | `ZtModalComponent` | `zt-ui-components/ui/modal` |
| Data Grid | `ZtDataGridModule` | `ZtDataGridComponent` | `zt-ui-components/ui/data-grid` |
| Toggle | `ZtToggleModule` | `ZtToggle` | `zt-ui-components/ui/toggle` |
| Checkbox | `ZtCheckboxModule` | `ZtCheckbox` | `zt-ui-components/ui/checkbox` |
| Radio | `ZtRadioModule` | `ZtRadio` | `zt-ui-components/ui/radio` |
| Paginator | `ZtPaginatorModule` | `ZtPaginatorComponent` | `zt-ui-components/ui/paginator` |
| Toast | `ZtToastModule` | `ZtToastComponent` | `zt-ui-components/ui/toast` |
| Datetime Picker | `ZtDatetimePickerModule` | `ZtDatetimePickerComponent` | `zt-ui-components/ui/datetime-picker` |

## 🧪 Testing Your Migration

### Build Verification
```bash
ng build --configuration production
```

### Bundle Size Analysis
```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### Runtime Verification
- Check browser console for deprecation warnings
- Verify all components render correctly
- Test form submissions and interactions

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Update import paths to use the new standalone imports.

### Issue: Console warnings about deprecated modules
**Solution:** This is expected. Migrate to standalone imports to remove warnings.

### Issue: Bundle size not reduced
**Solution:** Use specific path imports for optimal tree-shaking:
```typescript
import { ZtButton } from 'zt-ui-components/ui/button';
```

### Issue: Module declarations still needed
**Solution:** Convert to standalone components or continue using deprecated modules temporarily.

## 📊 Performance Benefits

### Bundle Size Reduction
- **Before**: All components included (~500KB)
- **After**: Only used components included (~50-200KB depending on usage)

### Tree-Shaking Effectiveness
- **v1.x**: Limited tree-shaking due to module architecture
- **v2.0**: Full tree-shaking support with standalone components

## 🔄 Backward Compatibility

### What's Still Supported
- All existing component APIs
- All existing functionality
- Module-based imports (with warnings)

### What's Deprecated
- `ZT*Module` classes
- Module-based import patterns
- Traditional NgModule declarations

### Future Removal
- Module imports may be removed in v3.0.0
- Deprecation warnings will become errors

## 🆘 Need Help?

### Resources
- [CHANGELOG.md](CHANGELOG.md) - Complete change history
- [README.md](README.md) - Updated usage examples
- [Tutorial.mdx](projects/zt-ui-components/src/stories/Tutorial.mdx) - Interactive examples

### Support
- Check existing GitHub issues
- Create new issues for migration problems
- Review Storybook examples for component usage

## 📅 Migration Timeline

- **Immediate**: Update import statements
- **Week 1**: Test all functionality
- **Month 1**: Migrate to standalone components
- **Quarter 1**: Remove deprecated module usage
- **v3.0.0**: Module imports removed (breaking change)

## ✅ Success Checklist

- [ ] All imports updated
- [ ] Application builds successfully
- [ ] No console warnings (or acceptable deprecation warnings)
- [ ] Bundle size optimized
- [ ] All tests pass
- [ ] Documentation updated

Happy migrating! 🎉
