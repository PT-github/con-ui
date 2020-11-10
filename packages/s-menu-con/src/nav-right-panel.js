import MenuitemCon from './menuitem-con'
export default {
  name: 'Navitem',
  functional: true,
  props: {
    options: {
      type: Array,
      default: () => []
    },
  },
  render: function (h, context) {
    return (
      <div class='nav-right-panel'>
        {
          context.props.options &&
          context.props.options.length > 0 &&
          context.props.options.map(item => <div class="nav-group">
              <MenuitemCon
                {
                  ...{
                    attrs: { ...item }
                  }
                }
              >
                { item.icon && <i class={ item.icon }></i>}
                <span slot="title">{ item.name }</span>
              </MenuitemCon>
              <div className="nav-group-sub">
                {
                  item.children &&
                  item.children.length > 0 &&
                  item.children.map(submenu => <MenuitemCon
                    {
                      ...{
                        attrs: { ...submenu }
                      }
                    }
                  >
                    { submenu.icon && <i class={ submenu.icon }></i>}
                    <span slot="title">{ submenu.name }</span>
                  </MenuitemCon>)
                }
              </div>
            </div>)
        }
        
      </div>
    )
  },
  components: {
    MenuitemCon
  }
}