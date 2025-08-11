import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySearch'
})
export class FilterBySearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return Object.values(item).some(value => {
        // Si la valeur est un objet (ex: enjeu), on vérifie ses champs aussi
        if (value && typeof value === 'object') {
          return Object.values(value).some(subValue =>
            String(subValue).toLowerCase().includes(searchText)
          );
        }
        return String(value).toLowerCase().includes(searchText);
      });
    });
  }
}


  // transform(items: any[], searchText: string): any[] {
  //   if (!items) return [];
  //   if (!searchText) return items;

  //   searchText = searchText.toLowerCase();

  //   return items.filter(item =>
  //     Object.values(item).some(val =>
  //       val && val.toString().toLowerCase().includes(searchText)
  //     )
  //   );
  // } }

