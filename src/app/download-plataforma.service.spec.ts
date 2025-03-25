import { TestBed } from '@angular/core/testing';

import { DownloadPlataformaService } from './download-plataforma.service';

describe('DownloadPlataformaService', () => {
  let service: DownloadPlataformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadPlataformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
