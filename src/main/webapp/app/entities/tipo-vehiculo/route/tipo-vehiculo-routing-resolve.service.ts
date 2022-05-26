import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoVehiculo, TipoVehiculo } from '../tipo-vehiculo.model';
import { TipoVehiculoService } from '../service/tipo-vehiculo.service';

@Injectable({ providedIn: 'root' })
export class TipoVehiculoRoutingResolveService implements Resolve<ITipoVehiculo> {
  constructor(protected service: TipoVehiculoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoVehiculo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoVehiculo: HttpResponse<TipoVehiculo>) => {
          if (tipoVehiculo.body) {
            return of(tipoVehiculo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoVehiculo());
  }
}
