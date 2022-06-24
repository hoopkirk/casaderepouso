$(document).on('destroy.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api(settings);
    api.off('order.dt');
    api.off('preDraw.dt');
    api.off('column-visibility.dt');
    api.off('search.dt');
    api.off('page.dt');
    api.off('length.dt ');
    api.off(' xhr.dt ');
});

$(document).ready(function () {

})

class Table {
    constructor() {
        this.data
        this.alias = 'fields'
        this.nameTable = ''
        this.width = {}
        this.head = {}
        this.hide = []
        this.case = {}
        this.nameCheck = 'check_box'
        this.check = false
        this.checkMultiSelection = false
        this.searching = true
        this.paging = true
        this.ordering = false
        this.buttons = []
        this.rowsGroup = []
        this.id = 'id'
        this.fields = {}
        this.btn = {
            createName: 'Create',
            create: false,
            createFunction: () => { },

            refresh: true,
            refreshName: 'Refresh',
            refreshFunction: () => { },

            update: false,
            updateName: 'Edit',
            updateFunction: () => { },

            delete: false,
            deleteName: 'Delete',
            deleteFunction: () => { }
        }
        this.buttons = []
        this.createButtons = true

    }

    validate() {

        var _this = this;

        if (!_this.nameTable.length) {
            return {
                result: false,
                message: 'nameTable must be specified'
            }
        }

        if (!_this.data.length) {
            return {
                result: false,
                message: 'url_get_all must be specified'
            }
        }

        if (_this.btn.refresh && !_this.btn.refreshName.length) {
            return {
                result: false,
                message: 'refreshName must be specified'
            }
        }

        if (_this.btn.create && !_this.btn.createName.length) {
            return {
                result: false,
                message: 'createName must be specified'
            }
        }

        if (_this.btn.update && !_this.btn.updateName.length) {
            return {
                result: false,
                message: 'updateName must be specified'
            }
        }

        if (_this.btn.delete && !_this.btn.deleteName.length) {
            return {
                result: false,
                message: 'deleteName must be specified'
            }
        }

        if (_this.createButtons) {
            if (_this.btn.create) {
                _this.buttons.push(
                    {
                        text: `<i class="fa fa-plus"></i> ${_this.btn.createName}`,
                        className: _this.buttons.length ? 'btn btn-success ml-2' : 'btn btn-success',
                        action: function (e, dt, node, config) {
                            _this.btn.createFunction()
                        }
                    }
                )
            }
            if (_this.btn.update) {
                _this.buttons.push(
                    {
                        text: `<i class="fa fa-edit"></i> ${_this.btn.updateName}`,
                        className: _this.buttons.length ? 'btn btn-info ml-2' : 'btn btn-info',
                        action: function (e, dt, node, config) {
                            _this.btn.updateFunction()
                        }
                    }
                )
            }
            if (_this.btn.delete) {
                _this.buttons.push(
                    {
                        text: `<i class="fa fa-trash"></i> ${_this.btn.deleteName}`,
                        className: _this.buttons.length ? 'btn btn-danger ml-2' : 'btn btn-danger',
                        action: function (e, dt, node, config) {
                            _this.btn.deleteFunction()
                        }
                    }
                )
            }
            if (_this.btn.refresh) {
                _this.buttons.push(
                    {
                        text: `<i class="fa fa-refresh"></i> ${_this.btn.refreshName}`,
                        className: _this.buttons.length ? ' ml-2' : '',
                        action: function (e, dt, node, config) {
                            _this.btn.refreshFunction()
                        }
                    }
                )
            }
            _this.createButtons = false
        }

        return {
            result: true,
            message: 'successfully validated'
        }
    }

    getSelected() {
        let selecionados = []
        let check = document.getElementById('itens').querySelectorAll('.selected')

        check.forEach((item) => {
            if (item.querySelector('.select-checkbox') != null && item.querySelector('.select-checkbox') != undefined) {
                //selecionados.push(item.cells[1].innerText)
                selecionados.push(item.cells)
            }
        })
        return selecionados
    }

    generate() {

        var _this = this;
        let { result, message } = _this.validate()
        if (!result) return alert(message)

        try {
            if (_this.data.length) {

                let columns = []
                let data = []
                if (_this.check) {

                    let columnNames2 = Object.keys(_this.data[0]);
                    _this.data.forEach(element => {

                        let jsonArray = {}
                        jsonArray[_this.nameCheck] = ''

                        for (let i in columnNames2) {
                            jsonArray[columnNames2[i]] = element[columnNames2[i]]
                        }
                        data.push(jsonArray);

                    });

                } else {
                    data = res
                }

                // let fields = []

                let columnNames = Object.keys(data[0]);
                for (let i in columnNames) {

                    $('#head').append('<th></th>')

                    let title = columnNames[i]
                    let width = ''

                    let visible = true
                    _this.hide.forEach(hidden => {
                        if (hidden == title) {
                            visible = false
                        }
                    })

                    let keysName = Object.keys(_this.head)
                    keysName.forEach(nameAlter => {
                        switch (title) {
                            case nameAlter:
                                title = _this.head[nameAlter]
                                break;
                            default:
                                break;
                        }
                    })

                    keysName = Object.keys(_this.width)
                    keysName.forEach(nameAlter => {
                        switch (title) {
                            case nameAlter:
                                width = _this.width[nameAlter]
                                break;
                            default:
                                break;
                        }
                    })

                    if (title != _this.nameCheck) {
                        columns.push({
                            width: width,
                            data: columnNames[i],
                            title: title,
                            visible: visible
                        });
                        // fields.push({
                        //     label: title,
                        //     name: columnNames[i]
                        // })
                    } else {
                        columns.push({
                            width: "5%",
                            orderable: false,
                            className: 'select-checkbox',
                            data: _this.nameCheck
                        })
                    }
                }

                $(_this.nameTable).dataTable().fnDestroy();

                try {

                    var table = $(_this.nameTable).DataTable({
                        data: data,
                        columns: columns,
                        select: {
                            style: _this.checkMultiSelection ? 'os' : 'single',
                            selector: 'td:first-child',
                        },
                        'rowsGroup': _this.rowsGroup.length > 0 ? _this.rowsGroup : null,

                        'createdRow': function (row, data, dataIndex) {
                            let indexRow = Object.keys(data)
                            indexRow.forEach((iten, index) => {
                                let keysNameCase = Object.keys(_this.case)
                                keysNameCase.forEach(nameAlter => {
                                    if (nameAlter == iten) {
                                        if (_this.case[nameAlter][data[nameAlter]] != undefined && _this.case[nameAlter][data[nameAlter]] != null) {
                                            $('td', row).eq(index).html(_this.case[nameAlter][data[nameAlter]])
                                        }
                                    }

                                })
                            })
                        },
                        "language":
                        {
                            "sProcessing": "A processar...",
                            "sLengthMenu": "Mostrar _MENU_ registos",
                            "sZeroRecords": "Não foram encontrados resultados",
                            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                            "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                            "sInfoPostFix": "",
                            "sSearch": "Procurar:",
                            "sUrl": "",
                            "oPaginate": {
                                "sFirst": "Primeiro",
                                "sPrevious": "Anterior",
                                "sNext": "Seguinte",
                                "sLast": "Último"
                            },
                            buttons: {
                                copyTitle: 'Copiado para área de transferência',
                                copyKeys: 'Pressione <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> para copiar os dados da tabela para a área de transferência. <br><br>Para cancelar, clique nesta mensagem ou pressione Esc.',
                                copySuccess: {
                                    _: '%d linhas copiadas',
                                    1: '1 linha copiada'
                                }
                            }
                        },
                        "responsive": true,
                        // "lengthChange": true,
                        "autoWidth": false, //quebra tudo
                        "paging": _this.paging,
                        "searching": _this.searching,
                        "ordering": _this.ordering,
                        // "info": true,
                        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                        "pageLength": 50,
                        dom: 'Bfrtip',
                        "buttons": _this.buttons
                    })

                    if (_this.check && _this.checkMultiSelection) {
                        table.on("click", "th.select-checkbox", function () {
                            if ($("th.select-checkbox").hasClass("selected")) {
                                table.rows().deselect();
                                $("th.select-checkbox").removeClass("selected");
                            } else {

                                table.rows().select();
                                $("th.select-checkbox").addClass("selected");
                            }
                        }).on("select deselect", function () {
                            if (table.rows({
                                selected: true
                            }).count() !== table.rows().count()) {
                                $("th.select-checkbox").removeClass("selected");
                            } else {
                                $("th.select-checkbox").addClass("selected");
                            }
                        });
                    }

                } catch (err) {
                    console.log(err.message)
                }

                let date = new Intl.DateTimeFormat([], _OPTIONS_DATE);

                $('#message').text('Atualizado ' + date.format(new Date()))
            } else {
                $(_this.nameTable).dataTable().fnDestroy();
                $('#itens').html('')
                $('#message').text('Nenhum resultado')
            }
            $('#loading').attr('hidden', 'true');

        } catch (error) {
            return alert(error);
        }
    }

    fieldsCreated() {
        var _this = this;
        $('#' + _this.alias).html('')

        let keysFields = Object.keys(_this.fields)
        keysFields.forEach(key => {

            let element = _this.fields[key]
            console.log(element);
            let createField = `
            <div ${element.hidden == true ? 'hidden' : ''} class="${element.class != undefined ? element.class : ''}"><div class="form-group">
            <label for="${_this.alias + key}">${element.title != undefined ? element.title : ''}</label>
            `

            switch (element.obj) {
                case 'input':
                    createField += `
                          <input id="${_this.alias + key}" ${element.disabled == true ? 'disabled' : ''} name="${_this.alias + key}" required="" autocomplete="off" type="${element.type != undefined ? element.type : 'text'}" class="form-control" placeholder="${element.placeholder != undefined ? element.placeholder : ''}">
                         </div>`

                    break;
                case 'select':
                    createField += `
                        <select id="${_this.alias + key}"
                        class="form-control ${_this.alias + key} select2-hidden-accessible" style="width: 100%;"
                        aria-hidden="true">
                        <option selected value="">--Selecione--</option>
                        `
                    let optSelect = Object.keys(element.options)
                    optSelect.forEach(opt => {
                        createField += `<option value="${opt}">${element.options[opt]}</option>`

                    })

                    createField += `</select>`
                    break;

                case 'date':
                    createField += `
                        <div class="input-group date" id="${_this.alias + key}" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input" data-target="#${_this.alias + key}">
                        <div class="input-group-append" data-target="#${_this.alias + key}" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                        </div>                    
                    `

                default:
                    break;
            }

            createField += `</div></div>`
            $('#' + _this.alias).append(createField)

            //Initialize
            if (element.obj == 'select') {
                $('.' + _this.alias + key).select2({
                    theme: 'bootstrap4'
                })
            }

            if (element.obj == 'date') {

                $('#' + _this.alias + key).datetimepicker(element.config)
                // $('#' + _this.alias + key).datetimepicker({
                //     icons: {
                //         time: 'far fa-clock'
                //     },
                //     date: element.date !== undefined ? element.date : moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
                //     locale: 'pt-br'
                // });
            }


            console.log(createField)
        });



    }
}



/*! RowsGroup for DataTables v2.0.0
 * 2015-2016 Alexey Shildyakov ashl1future@gmail.com
 * 2016 Tibor Wekerle
 */

/**
 * @summary     RowsGroup
 * @description Group rows by specified columns
 * @version     2.0.0
 * @file        dataTables.rowsGroup.js
 * @author      Alexey Shildyakov (ashl1future@gmail.com)
 * @contact     ashl1future@gmail.com
 * @copyright   Alexey Shildyakov
 * 
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in for DataTables automatically merges columns cells
 * based on it's values equality. It supports multi-column row grouping
 * in according to the requested order with dependency from each previous 
 * requested columns. Now it supports ordering and searching. 
 * Please see the example.html for details.
 * 
 * Rows grouping in DataTables can be enabled by using any one of the following
 * options:
 *
 * * Setting the `rowsGroup` parameter in the DataTables initialisation
 *   to array which containes columns selectors
 *   (https://datatables.net/reference/type/column-selector) used for grouping. i.e.
 *    rowsGroup = [1, 'columnName:name', ]
 * * Setting the `rowsGroup` parameter in the DataTables defaults
 *   (thus causing all tables to have this feature) - i.e.
 *   `$.fn.dataTable.defaults.RowsGroup = [0]`.
 * * Creating a new instance: `new $.fn.dataTable.RowsGroup( table, columnsForGrouping );`
 *   where `table` is a DataTable's API instance and `columnsForGrouping` is the array
 *   described above.
 *
 * For more detailed information please see:
 *     
 */

(function ($) {

    ShowedDataSelectorModifier = {
        order: 'current',
        page: 'current',
        search: 'applied',
    }

    GroupedColumnsOrderDir = 'asc';


    /*
     * columnsForGrouping: array of DTAPI:cell-selector for columns for which rows grouping is applied
     */
    var RowsGroup = function (dt, columnsForGrouping) {
        this.table = dt.table();
        this.columnsForGrouping = columnsForGrouping;
        // set to True when new reorder is applied by RowsGroup to prevent order() looping
        this.orderOverrideNow = false;
        this.mergeCellsNeeded = false; // merge after init
        this.order = []

        var self = this;
        dt.on('order.dt', function (e, settings) {
            if (!self.orderOverrideNow) {
                self.orderOverrideNow = true;
                self._updateOrderAndDraw()
            } else {
                self.orderOverrideNow = false;
            }
        })

        dt.on('preDraw.dt', function (e, settings) {
            if (self.mergeCellsNeeded) {
                self.mergeCellsNeeded = false;
                self._mergeCells()
            }
        })

        dt.on('column-visibility.dt', function (e, settings) {
            self.mergeCellsNeeded = true;
        })

        dt.on('search.dt', function (e, settings) {
            // This might to increase the time to redraw while searching on tables
            //   with huge shown columns
            self.mergeCellsNeeded = true;
        })

        dt.on('page.dt', function (e, settings) {
            self.mergeCellsNeeded = true;
        })

        dt.on('length.dt', function (e, settings) {
            self.mergeCellsNeeded = true;
        })

        dt.on('xhr.dt', function (e, settings) {
            self.mergeCellsNeeded = true;
        })

        this._updateOrderAndDraw();

        /* Events sequence while Add row (also through Editor)
         * addRow() function
         *   draw() function
         *     preDraw() event
         *       mergeCells() - point 1
         *     Appended new row breaks visible elements because the mergeCells() on previous step doesn't apllied to already processing data
         *   order() event
         *     _updateOrderAndDraw()
         *       preDraw() event
         *         mergeCells()
         *       Appended new row now has properly visibility as on current level it has already applied changes from first mergeCells() call (point 1)
         *   draw() event
         */
    };


    RowsGroup.prototype = {
        setMergeCells: function () {
            this.mergeCellsNeeded = true;
        },

        mergeCells: function () {
            this.setMergeCells();
            this.table.draw();
        },

        _getOrderWithGroupColumns: function (order, groupedColumnsOrderDir) {
            if (groupedColumnsOrderDir === undefined)
                groupedColumnsOrderDir = GroupedColumnsOrderDir

            var self = this;
            var groupedColumnsIndexes = this.columnsForGrouping.map(function (columnSelector) {
                return self.table.column(columnSelector).index()
            })
            var groupedColumnsKnownOrder = order.filter(function (columnOrder) {
                return groupedColumnsIndexes.indexOf(columnOrder[0]) >= 0
            })
            var nongroupedColumnsOrder = order.filter(function (columnOrder) {
                return groupedColumnsIndexes.indexOf(columnOrder[0]) < 0
            })
            var groupedColumnsKnownOrderIndexes = groupedColumnsKnownOrder.map(function (columnOrder) {
                return columnOrder[0]
            })
            var groupedColumnsOrder = groupedColumnsIndexes.map(function (iColumn) {
                var iInOrderIndexes = groupedColumnsKnownOrderIndexes.indexOf(iColumn)
                if (iInOrderIndexes >= 0)
                    return [iColumn, groupedColumnsKnownOrder[iInOrderIndexes][1]]
                else
                    return [iColumn, groupedColumnsOrderDir]
            })

            groupedColumnsOrder.push.apply(groupedColumnsOrder, nongroupedColumnsOrder)
            return groupedColumnsOrder;
        },

        // Workaround: the DT reset ordering to 'asc' from multi-ordering if user order on one column (without shift)
        //   but because we always has multi-ordering due to grouped rows this happens every time
        _getInjectedMonoSelectWorkaround: function (order) {
            if (order.length === 1) {
                // got mono order - workaround here
                var orderingColumn = order[0][0]
                var previousOrder = this.order.map(function (val) {
                    return val[0]
                })
                var iColumn = previousOrder.indexOf(orderingColumn);
                if (iColumn >= 0) {
                    // assume change the direction, because we already has that in previos order
                    return [[orderingColumn, this._toogleDirection(this.order[iColumn][1])]]
                } // else This is the new ordering column. Proceed as is.
            } // else got milti order - work normal
            return order;
        },

        _mergeCells: function () {
            var columnsIndexes = this.table.columns(this.columnsForGrouping, ShowedDataSelectorModifier).indexes().toArray()
            var showedRowsCount = this.table.rows(ShowedDataSelectorModifier)[0].length
            this._mergeColumn(0, showedRowsCount - 1, columnsIndexes)
        },

        // the index is relative to the showed data
        //    (selector-modifier = {order: 'current', page: 'current', search: 'applied'}) index
        _mergeColumn: function (iStartRow, iFinishRow, columnsIndexes) {
            var columnsIndexesCopy = columnsIndexes.slice()
            currentColumn = columnsIndexesCopy.shift()
            currentColumn = this.table.column(currentColumn, ShowedDataSelectorModifier)

            var columnNodes = currentColumn.nodes()
            var columnValues = currentColumn.data()

            var newSequenceRow = iStartRow,
                iRow;
            for (iRow = iStartRow + 1; iRow <= iFinishRow; ++iRow) {

                if (columnValues[iRow] === columnValues[newSequenceRow]) {
                    $(columnNodes[iRow]).hide()
                } else {
                    $(columnNodes[newSequenceRow]).show()
                    $(columnNodes[newSequenceRow]).attr('rowspan', (iRow - 1) - newSequenceRow + 1)

                    if (columnsIndexesCopy.length > 0)
                        this._mergeColumn(newSequenceRow, (iRow - 1), columnsIndexesCopy)

                    newSequenceRow = iRow;
                }

            }
            $(columnNodes[newSequenceRow]).show()
            $(columnNodes[newSequenceRow]).attr('rowspan', (iRow - 1) - newSequenceRow + 1)
            if (columnsIndexesCopy.length > 0)
                this._mergeColumn(newSequenceRow, (iRow - 1), columnsIndexesCopy)
        },

        _toogleDirection: function (dir) {
            return dir == 'asc' ? 'desc' : 'asc';
        },

        _updateOrderAndDraw: function () {
            this.mergeCellsNeeded = true;

            var currentOrder = this.table.order();
            currentOrder = this._getInjectedMonoSelectWorkaround(currentOrder);
            this.order = this._getOrderWithGroupColumns(currentOrder)
            this.table.order($.extend(true, Array(), this.order))
            this.table.draw()
        },
    };


    $.fn.dataTable.RowsGroup = RowsGroup;
    $.fn.DataTable.RowsGroup = RowsGroup;

    // Automatic initialisation listener
    $(document).on('init.dt', function (e, settings) {
        if (e.namespace !== 'dt') {
            return;
        }

        var api = new $.fn.dataTable.Api(settings);

        if (settings.oInit.rowsGroup ||
            $.fn.dataTable.defaults.rowsGroup) {
            options = settings.oInit.rowsGroup ?
                settings.oInit.rowsGroup :
                $.fn.dataTable.defaults.rowsGroup;
            var rowsGroup = new RowsGroup(api, options);
            $.fn.dataTable.Api.register('rowsgroup.update()', function () {
                rowsGroup.mergeCells();
                return this;
            });
            $.fn.dataTable.Api.register('rowsgroup.updateNextDraw()', function () {
                rowsGroup.setMergeCells();
                return this;
            });
        }
    });

}(jQuery));

/*
 
TODO: Provide function which determines the all <tr>s and <td>s with "rowspan" html-attribute is parent (groupped) for the specified <tr> or <td>. To use in selections, editing or hover styles.
 
TODO: Feature
Use saved order direction for grouped columns
    Split the columns into grouped and ungrouped.
    
    user = grouped+ungrouped
    grouped = grouped
    saved = grouped+ungrouped
    
    For grouped uses following order: user -> saved (because 'saved' include 'grouped' after first initialisation). This should be done with saving order like for 'groupedColumns'
    For ungrouped: uses only 'user' input ordering
*/