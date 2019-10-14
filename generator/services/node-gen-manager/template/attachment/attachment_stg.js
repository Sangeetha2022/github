/*
 * Template group attachment
 * Compiled on Sat Oct 12 2019 16:24:03 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "attachment"; 

group.name = "attachment";





//
// Template /attachment
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("import * as multer from 'multer';");
    w.write("\n");
    w.write("import * as nanoid from 'nanoid/generate';");
    w.write("\n");
    w.write("import { AttachmentService } from '../services/attachment.service';");
    w.write("\n");
    w.write("const uploadFilter = function (req, file, cb) {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("const extension = file.mimetype.split('/')[1];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("// if (extension === 'html') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("//     return cb(new Error('file type not allow to upload'));");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("// }");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("cb(null, true);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("// filter rules here");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("var storage = multer.diskStorage({");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("destination: function (req, file, cb) {");
    w.popIndentation();
    w.write("\n");
    w.write("        ");
    if (st.test(st.prop(s, g, rc, s.object, "location", { file: gFile, line: 16, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "location", { file: gFile, line: 16, column: 37 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("cb(null, '");
                     st.write(w, s, g, rc, s.location);
                     w.write("')");
            }, [
            { name: "location"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
    }
    w.write(" ");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("filename: function (req, file, cb) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("const unique = nanoid('0123456789', 8)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("cb(null, unique.concat(`.${file.originalname}`))");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("\n");
    w.write("var upload = multer({ storage: storage, fileFilter: uploadFilter }).array('file', ");
    if (st.test(st.prop(s, g, rc, s.object, "count", { file: gFile, line: 24, column: 93 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "count", { file: gFile, line: 24, column: 108 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.count);
            }, [
            { name: "count"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
    }
    w.write(");");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("export class FileUpload {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public uploadFile(req, res) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("upload(req, res, function (err) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("if (err instanceof multer.MulterError) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (err.code === 'LIMIT_UNEXPECTED_FILE') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("res.status(400);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("res.send({ message: 'File Upload Limit Exceed' })");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("} else if (err.code === 'LIMIT_FILE_SIZE') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("res.status(400);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("res.send({ message: 'File Size is Too Large' })");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("} else if (err) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("console.log(err)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("res.status(501).json({ error: err });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("} else {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("res.status(200);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (req.files) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("new AttachmentService().uploadFile(req.files, file => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                        ");
    w.write("res.json(file);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/attachment", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;