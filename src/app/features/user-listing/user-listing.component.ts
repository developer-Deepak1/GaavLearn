import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardComponent } from 'src/app/@theme/components/card/card.component';
import { UserListing } from 'src/app/commonService/user.model';
import { UserService } from 'src/app/commonService/user.service';

@Component({
  selector: 'app-user-listing',
  imports: [TableModule, CardComponent,CommonModule],
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.scss'
})
export class UserListingComponent implements OnInit {
  private _userService = inject(UserService);
  public schoolID: string | null = null;
  userList: UserListing[] = [];
  columns=[
    { field: 'Username', header: 'Username' },
    { field: 'RoleName', header: 'RoleName' },
    { field: 'FullName', header: 'FullName' },
    { field: 'ContactNumber', header: 'ContactNumber' },
    { field: 'EmailID', header: 'EmailID' },
  ];

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe(users => {
      this.userList = users;
    });
    this.schoolID = this._userService.GetUserSchoolID();
    if (this.schoolID === null) {
      this.columns.push({ field: 'SchoolName', header: 'SchoolName' });
    }
  }

}
