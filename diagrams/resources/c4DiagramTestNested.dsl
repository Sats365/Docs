workspace {
    model {
        sourceSystems = softwareSystem "SA" "Источники данных111" {
        }
        
        analyst = person "An" "Аналитик" {
        }

        olap = softwareSystem "OLAP" {
            analyst -> this "Смотрит отчеты"
        }

        dev = person "DWH Developer" {
        }
    
        solution = softwareSystem "DWH Solution" "Решение" {
            mdt = container MDT 
            dwh = container DWH {
                // technology "MSSQL 2016"

                sa = component SA {
                    sourceSystems -> this "Предоставляет данные"
                }
                hist = component Hist {
                    sa -> this "Данные 1"
                }
                fact = component Fact {
                    hist -> this "Данные 2"
                }
                marts = component Marts {
                    fact -> this "Данные 3"
                    this -> olap "Данные из витрин"
                }
                
                dwh -> mdt "Данные справочников на меппинг"
                mdt -> dwh "Замепленные данные"
            }
            dcore = container DCore {
                // technology "MDT ASP.NET"
                // description "Хранит информацию по маршрутам связывается с внешними источниками"
                this -> dwh "Управляет загрузкой"
                dev -> dcore "Настраивает загрузки"
            }
        }
    }
    
    views {
        theme default
    }
}
