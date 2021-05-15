import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { csv_to_mobility_array } from '../../shared/utils/csv-to-mobility-array';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  fileName = '';

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void { }

  async onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      var text = await readAsTextFromFile(file)

      this.dataService.setData(csv_to_mobility_array(text))

      this.router.navigate(['/table']);

    }
  }
}

async function readAsTextFromFile(file: File) {
  return new Promise<string>(
    (resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(<string>fileReader.result);
      }
      fileReader.readAsText(file, "UTF-8");
    }
  )
}
