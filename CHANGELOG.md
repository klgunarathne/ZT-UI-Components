# Changelog

All notable changes to ZT-UI Components will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2025-11-25

### 📦 **Dependencies**
- **Added @angular/cdk as peer dependency**: Required for virtual scrolling in data grid component
- **Updated documentation**: Clear peer dependency requirements in README.md
- **Enhanced installation guide**: Instructions for optional CDK installation

### 🔧 **Technical Improvements**
- **Proper dependency management**: CDK now properly declared as peer dependency
- **Better error messages**: Users get clear guidance when CDK features are needed
- **Performance optimization**: Virtual scrolling available when CDK is installed

---

## [2.0.2] - 2025-11-25

### 🔄 **API Changes**
- **Removed deprecation warnings**: All `ZT*Module` classes no longer show console warnings
- **Dual API support**: Both standalone components and module imports are now fully supported without warnings
- **Backward compatibility**: Existing module-based applications continue to work seamlessly
- **No breaking changes**: All import patterns remain functional

### 📦 **Technical Details**
- Added comprehensive `exports` mapping in package.json for all component subpaths
- Maintained backward compatibility while fixing import resolution
- No breaking changes - all existing functionality preserved

---

## [2.0.0] - 2025-11-25

### 🚀 **Major Changes - Breaking Changes**

#### **New Import Architecture**
- **BREAKING**: Implemented specific differentiated import paths for optimal tree-shaking
- **BREAKING**: All components now available via dedicated paths (e.g., `zt-ui-components/ui/button`)
- Added barrel exports for clean, modern import syntax
- Enhanced build optimization with selective component imports

#### **Module Deprecation**
- **DEPRECATED**: All `ZT*Module` classes are now deprecated
- Added `@deprecated` JSDoc comments to all module classes
- Runtime console warnings guide users to standalone imports
- Maintained backward compatibility for existing applications

#### **Import Path Changes**

**✅ New Recommended Usage (Standalone Components):**
```typescript
// Import components directly (recommended)
import { ZtButton, ZtInput, ZtCard } from 'zt-ui-components';

// For module-based applications (deprecated but supported)
import { ZTButtonModule } from 'zt-ui-components/ui/button';
import { ZTInputModule } from 'zt-ui-components/ui/input';
```

**⚠️ Deprecated Module Imports (shows console warnings):**
```typescript
// These will show deprecation warnings
import { ZTButtonModule } from 'zt-ui-components/ui/button';
// Console: "ZTButtonModule is deprecated. Use standalone ButtonComponent import instead"
```

### 📦 **New Features**

#### **Tree-Shakable Imports**
- Components can be imported individually for smaller bundle sizes
- Automatic tree-shaking removes unused components
- Optimized build outputs for better performance

#### **Enhanced Developer Experience**
- Clear migration guidance in console warnings
- TypeScript deprecation warnings in IDEs
- Comprehensive documentation updates
- Storybook integration maintained

### 🔧 **Technical Improvements**

#### **Architecture Changes**
- Created `ui/*` directory structure for component modules
- Added wrapper modules for standalone components
- Updated public API exports
- Enhanced build configuration

#### **Documentation Updates**
- Updated README.md with new import examples
- Updated tutorial.mdx with migration guidance
- Added deprecation notices throughout documentation
- Maintained backward compatibility examples

### 📋 **Migration Guide**

#### **For Existing Applications**

1. **Immediate Action Required**: Update import statements
2. **Recommended**: Migrate to standalone component imports
3. **Optional**: Continue using deprecated modules (with warnings)

#### **Migration Steps**

**Step 1: Update Imports (Required)**
```typescript
// Before (v1.x)
import { ZtButtonModule } from 'zt-ui-components';

// After (v2.0) - Option A: Standalone (Recommended)
import { ZtButton } from 'zt-ui-components';

// After (v2.0) - Option B: Module (Deprecated)
import { ZTButtonModule } from 'zt-ui-components/ui/button';
```

**Step 2: Update Module Declarations**
```typescript
// Before (v1.x)
@NgModule({
  imports: [ZtButtonModule],
})
export class AppModule {}

// After (v2.0) - No module declaration needed for standalone
@Component({
  standalone: true,
  imports: [ZtButton],
})
export class MyComponent {}
```

### 🔄 **Backward Compatibility**

- **✅ Maintained**: All existing functionality works
- **⚠️ Deprecated**: Module-based imports show warnings
- **📅 Future**: Module imports may be removed in v3.0.0
- **🎯 Recommended**: Migrate to standalone imports

### 📊 **Version Compatibility Matrix**

| Angular Version | ZT-UI v1.x | ZT-UI v2.0 |
|----------------|------------|------------|
| Angular 14     | ✅         | ❌         |
| Angular 15     | ✅         | ❌         |
| Angular 16     | ✅         | ✅         |
| Angular 17+    | ✅         | ✅         |

### 🧪 **Testing**

- All existing tests pass
- New import paths validated
- Standalone component usage verified
- Backward compatibility confirmed

### 📚 **Documentation**

- Updated all usage examples
- Added migration guides
- Enhanced API documentation
- Storybook stories updated

### 🤝 **Contributing**

- Development setup unchanged
- Build process optimized
- Testing requirements updated

---

## Previous Versions

### [1.x.x] - Legacy Versions
- Module-based component architecture
- Traditional Angular module imports
- Limited tree-shaking capabilities

---

**Migration Timeline:**
- **v2.0.0**: Deprecation warnings added, backward compatibility maintained
- **v2.1.0**: Enhanced standalone features (planned)
- **v3.0.0**: Module imports removed (planned, breaking change)

For detailed migration assistance, see [MIGRATION.md](MIGRATION.md).
