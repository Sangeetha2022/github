export const component = [
    {
        name: 'ckeditor',
        htmlDependencies: `[editor]='Editor'`,
        variableList: [`Editor = ClassicEditor`],
        componentDependencies: [
            {
                dependencyName: '* as ClassicEditor',
                dependencyPath: '@ckeditor/ckeditor5-build-classic'
            }
        ],
        module: {
        dependencies: [
            {
                dependencyName: 'CKEditorModule',
                dependencyPath: '@ckeditor/ckeditor5-angular'
            }
        ],
        imports: [
            'CKEditorModule' 
        ]},
        packageDependencyList: [
            `"@ckeditor/ckeditor5-angular": "~1.1.0",`,
            `"@ckeditor/ckeditor5-build-classic": "~12.3.1",`
        ]
    }
]