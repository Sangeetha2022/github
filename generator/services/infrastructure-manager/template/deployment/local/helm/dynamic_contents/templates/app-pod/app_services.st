app_services(object) ::=<<
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.app.prefix }}-app
  namespace: {{ .Values.app.namespace }}
spec:
  type: NodePort
  ports:
  - name: {{ .Values.service.authproxy.name }}
    port: {{ .Values.service.authproxy.port }}
    targetPort: {{ .Values.service.authproxy.targetPort }}
  - name: {{ .Values.service.camunda.name }}
    port: {{ .Values.service.camunda.port }}
    targetPort: {{ .Values.service.camunda.targetPort }}
  - name: {{ .Values.service.security.name }}
    port: {{ .Values.service.security.port }}
    targetPort: {{ .Values.service.security.targetPort }}
  - name: {{ .Values.service.admin.name }}
    port: {{ .Values.service.admin.port }}
    targetPort: {{ .Values.service.admin.targetPort }}
$if(object.custom_node)$$object.custom_node:{custom_node | 
$\ $$\ $- name: {{ .Values.service.$custom_node.name$.name \}\}
    port: {{ .Values.service.$custom_node.name$.port \}\}
    targetPort: {{ .Values.service.$custom_node.name$.targetPort \}\}
};separator="\n"$$endif$
  selector:
    app: {{ .Values.app.prefix }}-app
>>