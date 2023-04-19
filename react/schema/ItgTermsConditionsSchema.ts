const ItgTermsConditionsSchema = {
  title: "Terminos y Condiciones - Producto",
  description: "Configuracion de Terminos y Condiciones de Producto",
  type: "object",
  properties: {
    defaultTerms: {
      title: "Terminos y Condiciones - Default",
      type: "string",
      widget: {
        "ui:widget": "textarea"
      }
    },
    customTerms: {
      title: "Terminos y Condiciones - Custom",
      type: "array",
      items: {
        properties: {
          __editorItemTitle: {
            title: "Nombre de Configuracion",
            type: "string"
          },
          identifier: {
            title: "Tipo de Identificador",
            type: "string",
            enum: [
              "Sku",
              "Coleccion"
            ],
            default: "Sku"
          },
          identifierId: {
            title: "Id Identificador",
            type: "string"
          },
          termsText: {
            title: "Texto de Terminos y Condiciones",
            type: "string",
            widget: {
              "ui:widget": "textarea"
            }
          },
          startDate: {
            title: "Fecha de Incio de Visualizacion",
            type: "string",
            widget: {
              "ui:widget": "date-time"
            }
          },
          endDate: {
            title: "Fecha Final de Visualizacion",
            type: "string",
            widget: {
              "ui:widget": "date-time"
            }
          },
        }
      }
    }
  }
}

export { ItgTermsConditionsSchema }
