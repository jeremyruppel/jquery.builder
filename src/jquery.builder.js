( function( $ )
{
  
  
  
  var Builder = function( tags )
  {
    // var self = this;
    
    // self.build = function( tag, value, options )
    // {
    //   if( typeof value === 'function' )
    //   {
    //     
    //   }
    //   else
    //   {
    //     
    //   }
    //   
    //   return self;
    // };
    
    this.build = function( tag, value, options )
    {
      return this;
    };
    
    this.tags = tags;
    
    $( tags ).each( $.proxy( function( index, tag )
    {
      this[ tag ] = function( value, options )
      {
        return this.build( tag, value, options );
      };
    }, this ) );
  };
  
  var defaults = 'h1 h2 h3 h4 h5 div input span a'.split( /\s+/ );
  
  $.fn.build = function( value )
  {
    switch( typeof value )
    {
      case 'function':
        
        var builder = new Builder( defaults );

        value.call( builder, builder );
        
        break;
      
      case 'string':
        
        defaults.push( $.trim( value ) );
      
        break;
    }

    return this;
  };
  
} )( jQuery );