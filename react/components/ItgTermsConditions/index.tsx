import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { ItgTermsConditionsSchema } from '../../schema/ItgTermsConditionsSchema';

type CustomTermsResume = {
  Sku: CustomTerms[]
  Coleccion: CustomTerms[]
}

type Identifier = 'Sku' | 'Coleccion'

type CustomTerms = {
  __editorItemTitle: string
  identifier: Identifier
  identifierId: string
  termsText: string
  startDate: string
  endDate: string
}

type ItgTermsConditionsProps = {
  defaultTerms: string
  customTerms: CustomTerms[]
}


const defaultTermsComponent = "La disponibilidad, precios y promociones pueden variar en almacenes, domicilios y www.panamericana.com.co <br/><br/>  Oferta válida el día {{currentDate}} | 2 unidades totales disponibles en www.panamericana.com.co | No acumulables con otras promociones | Aplica para referencias seleccionadas | Los elementos de ambientación no forman parte de los productos | Las fotografías no representan el tamaño real de los productos | Máximo 2 unidades por cliente y por factura en productos de tecnología | Para las ofertas de tecnología solo se permite la compra diaria de máximo 2 unidades de una misma referencia por cédula yo dirección";


const ItgTermsConditions = ({
  defaultTerms = defaultTermsComponent,
  customTerms
}:ItgTermsConditionsProps) => {

  //PRODUCT CONTEXT
  const productContext = useProduct();

  //STATES
  const [currentCustomTerms, setCurrentCustomTerms] = useState<CustomTermsResume | null>(null);
  const [currentTermsText, setCurrentTermsText] = useState<any>(null);

  //EFFECTS
  useEffect(() => {
    let customTermsResume: CustomTermsResume = {
      Sku: [],
      Coleccion: [],
    }

    customTerms.forEach((term:CustomTerms) => {
      const now = new Date();
      const startDateInput = new Date(term.startDate);
      const endDateInput = new Date(term.endDate);

      if(startDateInput.getTime() < now.getTime() && endDateInput.getTime() > now.getTime()) {
        customTermsResume[term.identifier].push(term);
      }
    })

    setCurrentCustomTerms(customTermsResume);
  },[])

  useEffect(() => {
    if(currentCustomTerms) {
      for(let term of currentCustomTerms.Sku) {
        if(term.identifierId === productContext.selectedItem.itemId) {
          setCurrentTermsText(formatTermsText(term.termsText));
          return;
        }
      }

      const productCollections = productContext.product.productClusters.map((collection:any) => collection.id);
      for(let term of currentCustomTerms.Coleccion) {
        if(productCollections.includes(term.identifierId)) {
          setCurrentTermsText(formatTermsText(term.termsText));
          return;
        }
      }
    }

    setCurrentTermsText(formatTermsText(defaultTerms));
  },[productContext, currentCustomTerms])

  //METHODS
  const formatTermsText = (termsText:string) => {
    const today = new Date();
    const dateToday = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric'} ).format(today).toString();

    const textFormated = termsText.replace("{{currentDate}}", dateToday)
    return textFormated;
  }

  //JSX
  return (
    <div
      dangerouslySetInnerHTML={{__html: currentTermsText}}
      style={{padding: "40px 66px", fontSize: "14px"}}
      />
  )
}

ItgTermsConditions.schema = ItgTermsConditionsSchema;

export default ItgTermsConditions;
