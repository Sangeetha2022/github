import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { MenuBuilderService } from './menu-builder.service';
import { TreeDragService } from './tree-drag/tree-drag.service';
import { EntityManagerComponent } from '../project-component/project-component.component';
import { ProjectComponentService } from '../project-component/project-component.service';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component
({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.scss']
})

export class MenuBuilderComponent implements OnInit
{
  public languages: any = [];
  public selectedLang: String='';
  public name: String='';
  private menuFId: any;
  private screenMenuName: any;
  public description: String='';
  private currentLang: String='';
  private menu: any;
  private menuFName: any;
  private project_id: String='';
  private featureDetailsData: any;
  private oldMenu: any = [];
  private newMenu: any = [];
  private menuDetails: any = [];
  private currentMenuDetails: any = [];
  private screenId: any;
  public logId = sessionStorage.getItem('LogId');
  private changeMenu: Boolean = false;
  private descriptionBeforeUpdate: String='';
  private menuBuilder: any;
  private menuBuilderDetails: any = [];
  
  constructor(private dataService: DataService,private route: ActivatedRoute,private database: TreeDragService,
              private menuBuilderService: MenuBuilderService,private projectComp: EntityManagerComponent,
              private screenService: ScreenDesignerService,private projectComponentService: ProjectComponentService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => 
    {
      this.project_id = params.projectId;
    });
    this.getMenuByProjectId();
    const run=()=>
    {
           const eventPopupModel = document.getElementById('warnModal');
           eventPopupModel!.style.display = 'block';
    }
    run();
  }

  closeWarn() 
  {
      const model = document.getElementById('warnModal');
      model!.style.display = 'none';
  }

  getSelectedMenu() 
  {
    this.name = '';
    this.dataService.currentSelectedMenuInfo.subscribe((data) => 
    {
        this.description = data;
        this.descriptionBeforeUpdate = data;
        this.dataService.currentMenuBuilderSource.subscribe(updatedmenuDetails => 
        {
          console.log("UpdatedmenuDetails:",updatedmenuDetails);
          updatedmenuDetails.forEach((menuData :any)=> 
          {
            if (menuData.featuremenu[0].description.feature === this.descriptionBeforeUpdate) 
            {
              this.name = menuData.featuremenu[0].name.feature;
              this.description=menuData.featuremenu[0].description.feature;
            } 
            else 
            {
              menuData.screenmenu.forEach((sData:any) => 
              {
                sData.description.screen.forEach((screen: String, index: string | number) => 
                {
                  if (screen === this.descriptionBeforeUpdate) 
                  {
                    this.name = sData.name.screen[index];
                  }
                });
              });
            }
          });
        });
    });
  }

  getMenuByProjectId() 
  {
    this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => 
    {
      this.menuBuilderDetails = menuBuilderData;
      const array:any[]= [];
      if (menuBuilderData.length !== 0) 
      {
        menuBuilderData.body.forEach((mData:any) => 
        {
          if (!this.changeMenu) 
          {
            if (mData.menu_option === true) 
            {
              this.languages = mData.project_languages;
              this.selectedLang = mData.language;
              this.currentLang = mData.language;
              this.currentMenuDetails = mData;
              this.menuDetails = mData.menuDetails;
            }
          } 
          else if (this.changeMenu) 
          {
            if (mData.language === this.currentLang) 
            {
              this.currentMenuDetails = mData;
              this.menuDetails = mData.menuDetails;
              this.menu = mData.menuDetails;
              mData.menu_option = true;
              this.updateMenuById(mData._id, mData);
            }
            this.languages.forEach((language:any) => 
            {
              if (language === mData.language && mData.menu_option === true) 
              {
                this.newMenu = mData;
              } 
              else if (language === mData.language && mData.menu_option === false) 
              {
                this.oldMenu = mData;
              }
              if (language !== this.currentLang) 
              {
                let FeatureDiff = [];
                if (this.newMenu.feature !== undefined && this.oldMenu.feature !== undefined) 
                {
                  FeatureDiff = this.oldMenu.feature.filter((x: any) => !this.newMenu.feature.includes(x));
                  if (FeatureDiff.length > 0) 
                  {
                    FeatureDiff.forEach((featureId:any) => 
                    {
                      this.newMenu.feature.push(featureId);
                    });
                    if (this.newMenu.feature.length > 0) 
                    {
                      this.newMenu.feature.forEach((feData:any) => 
                      {
                        if (feData !== null) 
                        {
                          this.featureDetailsData = [];
                          this.projectComponentService.getFeatureById(feData, this.logId).subscribe(feature => 
                          {
                              this.featureDetailsData = feature.body;
                              this.menuFId = this.featureDetailsData._id;
                              this.menuFName = this.featureDetailsData.name;
                              const fMenuData = 
                              {
                                feature: this.menuFName,
                                featureId: this.menuFId,
                              };
                              this.screenService.getScreenByFeatureId(feData, this.logId).subscribe(data => 
                              {
                                if (data.length !== 0) 
                                {
                                  this.screenMenuName = [];
                                  this.screenId = [];
                                  data.body.forEach((sData:any) => 
                                  {
                                    this.screenId.push(sData._id);
                                    this.screenMenuName.push(sData.screenName);
                                  });
                                  const screenData = 
                                  {
                                    screen: this.screenMenuName,
                                    screenId: this.screenId
                                  };
                                  const obj = 
                                  {
                                    featuremenu: [{ name: fMenuData, description: fMenuData }],
                                    screenmenu: 
                                    [{
                                      name: screenData,
                                      description: screenData
                                    }],
                                  };
                                  array.push(obj);
                                  this.menuBuilder = this.newMenu;
                                  this.menuBuilder.menuDetails = array;
                                  if (this.menu.length !== 0) 
                                  {
                                    this.menu.forEach((meData:any) => 
                                    {
                                      this.menuBuilder.menuDetails.forEach((menu:any) => 
                                      {
                                        if (meData.featuremenu.length > 0) 
                                        {
                                          if (menu.featuremenu[0].name.featureId === meData.featuremenu[0].name.featureId) 
                                          {
                                            menu.featuremenu[0].description = meData.featuremenu[0].description;
                                            if (menu.screenmenu[0].name.screenId !== undefined && meData.screenmenu[0].name.screenId !== undefined) 
                                            {
                                              const intersection = menu.screenmenu[0].name.screenId.filter((x:any) => meData.screenmenu[0].name.screenId.includes(x));
                                              if (intersection.length !== 0) 
                                              {
                                                intersection.forEach((sId:any) => 
                                                {
                                                  meData.screenmenu[0].name.screenId.forEach((dSId: any, index: string | number) => 
                                                  {
                                                    if (sId === dSId) 
                                                    {
                                                      menu.screenmenu[0].description.screen[index] = meData.screenmenu[0].description.screen[index];
                                                    }
                                                  });
                                                });
                                              }
                                            }
                                          }
                                        }
                                      });
                                    });
                                    if (this.menuBuilder.menuDetails[0].featuremenu[0].name.feature !== 'default') 
                                    {
                                      this.menuBuilder.menuDetails.splice(0, 0, this.menu[0]);
                                    }
                                  }
                                  this.updateMenuById(this.menuBuilder._id, this.menuBuilder);
                                }
                              });
                          },
                            error => { });
                        }
                      });
                    }
                  }
                }
              }
            });
          }
        });
      }
    });
  }

  updateMenuBuilder(description: any) 
  {
    console.log("Description:",description);
    this.menuDetails.forEach((element:any) => 
    {
      console.log("Update menu details:",this.menuDetails);
      if (element.featuremenu[0].description.feature === this.descriptionBeforeUpdate) 
      {
        console.log("If part");
        element.featuremenu[0].description.feature = description;
      } 
      else 
      {
        console.log("Else part");
        element.screenmenu.forEach((sData:any) => 
        {
          sData.description.screen.forEach((screen: String, index: any) => 
          {
            if (screen === this.descriptionBeforeUpdate) 
            {
              sData.description.screen.splice(index, 1, description);
            }
          });
        });
      }
    });
    console.log("Currentdetails:",this.currentMenuDetails);
    this.updateMenuById(this.currentMenuDetails._id, this.currentMenuDetails);
  }

  updateMenuById(id: any, menu: any) 
  {
    this.spinner.show();
    this.menuBuilderService.updateMenuById(id, menu, this.logId).subscribe(fMenu => 
    {
      console.log("fmenu:",fMenu);
      this.spinner.hide();
      this.database.initialize(fMenu.body.menuDetails);
      this.dataService.setMenuBuilder(fMenu.body.menuDetails);
      this.name = '';
      this.description = '';
    });
  }

  onChangeLang(event: String) 
  {
    this.selectedLang = event;
    if (this.currentLang !== this.selectedLang) 
    {
      this.changeMenu = true;
      this.currentLang = this.selectedLang;
      this.currentMenuDetails.menu_option = false;
      this.updateMenuById(this.currentMenuDetails._id, this.currentMenuDetails);
      this.getMenuByProjectId();
    }
  }
}