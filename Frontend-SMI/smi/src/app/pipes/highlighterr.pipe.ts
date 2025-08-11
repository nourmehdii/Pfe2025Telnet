import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighterr'
})
export class HighlighterrPipe implements PipeTransform {

 transform(text: string, searchText: string): any {
    if (!searchText) return text;
    const re = new RegExp(`(${searchText})`, 'gi');
    return text.replace(re, `<span class="highlighted">$1</span>`);
  }
  }


/** 
 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, searchText: string): any {
    if (!searchText) return text;
    const re = new RegExp(`(${searchText})`, 'gi');
    return text.replace(re, `<span class="highlighted">$1</span>`);
  }
}

 */